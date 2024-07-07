<?php

namespace App\Http\Controllers;

use App\Http\Requests\Operation\GetRoutesRequest;
use App\Http\Requests\Operation\StoreRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Models\Operation;
use App\Models\Storage;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Http;


class OperationController extends Controller
{
    public function index(Request $request)
    {
        // return response()->json($request->user, 200);
        $operations = Operation::where('user_id', $request->user->id)->get();
        return response()->json(compact('operations'), 200);
    }

    public function show(Request $request)
    {
        $operation = Operation::where('user_id', $request->user->id)->first();
        return response()->json(compact('operation'), 200);
    }

    public function destroy(Request $request)
    {
        $operation = Operation::where('user_id', $request->user->id)->andWhere('id', $request->operation->id)->first();
        $operation->delete();
        return response()->json(['message' => 'Operation deleted'], 200);
    }

    public function getRoutes(GetRoutesRequest $request)
{
    try {
        $nVehicles = Vehicle::where('user_id', $request->user()->id)->count();
        $storage = Storage::where('operation_id', $request->operation_id)->first();
        
        if (!$storage) {
            return response()->json(['error' => 'Storage not found'], 404);
        }

        $clients = Client::where('operation_id', $request->operation_id)->get();

        $coord = [];
        $coord[] = $storage['latitude'] . ',' . $storage['longitude'];
        foreach ($clients as $client) {
            $coord[] = $client['latitude'] . ',' . $client['longitude'];
        }

        $api_coord = implode('|', $coord);
        $matrixDistance = $this->getMatrixDistance($api_coord);

        if (is_array($matrixDistance)) {
            $routes = $this->clarkeWrightAlgorithm($matrixDistance, $nVehicles);
            $routes = array_map(function ($route) use ($coord) {
                return array_map(function ($node) use ($coord) {
                    $coords = explode(',', $coord[$node]);
                    return [
                        'lat' => (float) $coords[0],
                        'lng' => (float) $coords[1],
                    ];
                }, $route);
            }, $routes);

            return response()->json(compact('routes'), 200);
        } else {
            return response()->json(['error' => 'Failed to calculate distance matrix'], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
    }
}
    public function store(StoreRequest $request)
    {
        // return response()->json($request->user(), 200);
        $operation = Operation::create([
            'name' => $request->name,
            'user_id' => $request->user()->id,
            // 'user_id' => $request->user->id,
        ]);
        $storage = Storage::create([
            'name' => $request->storage['name'],
            'latitude' => $request->storage['latitude'],
            'longitude' => $request->storage['longitude'],
            'operation_id' => $operation->id,
        ]);
        $clients = $request->clients;
        foreach ($clients as $client) {
            $client = Client::create([
                'name' => $client['name'],
                'latitude' => $client['latitude'],
                'longitude' => $client['longitude'],
                'operation_id' => $operation->id,
            ]);
        }
        return response()->json(compact('operation'), 200);
    }

    private function getMatrixDistance(string $api_coord)
{
    try {
        $response = Http::get('https://maps.googleapis.com/maps/api/distancematrix/json', [
            'origins' => $api_coord,
            'destinations' => $api_coord,
            'mode' => 'driving',
            'key' => env('APP_GOOGLE_MAPS_API_KEY'),
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $rows = $data['rows'];
            $matrix = [];
            foreach ($rows as $i => $row) {
                foreach ($row['elements'] as $j => $element) {
                    $distance = $element['distance']['value'];
                    $matrix[$i][$j] = $distance;
                }
            }
            return $matrix;
        } else {
            throw new \Exception('Failed to get distance matrix from Google API');
        }
    } catch (\Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

    private function clarkeWrightAlgorithm(array $distances, int $nVehicles): array
    {
        $n = count($distances);
        $savings = [];
        $routes = [];

        // Calcular los ahorros
        for ($i = 1; $i < $n; $i++) {
            for ($j = $i + 1; $j < $n; $j++) {
                $savings[] = [
                    'i' => $i,
                    'j' => $j,
                    'saving' => $distances[0][$i] + $distances[0][$j] - $distances[$i][$j]
                ];
            }
        }

        // Ordenar los ahorros de mayor a menor
        usort($savings, function ($a, $b) {
            return $b['saving'] <=> $a['saving'];
        });

        for ($i = 1; $i < $n; $i++) {
            $routes[$i] = [$i];
        }

        foreach ($savings as $saving) {
            $i = $saving['i'];
            $j = $saving['j'];

            // Encontrar las rutas que contienen los nodos i y j
            $routeI = null;
            $routeJ = null;

            foreach ($routes as $key => $route) {
                if (in_array($i, $route)) {
                    $routeI = $key;
                }
                if (in_array($j, $route)) {
                    $routeJ = $key;
                }
            }

            // Unimos las rutas si i y j están en diferentes rutas y no exceden el número de vehículos
            if ($routeI !== null && $routeJ !== null && $routeI != $routeJ && count($routes[$routeI]) + count($routes[$routeJ]) <= $nVehicles) {
                $routes[$routeI] = array_merge($routes[$routeI], $routes[$routeJ]);
                unset($routes[$routeJ]);
            }
        }

        // Indicamos el almacen como inicio y fin de cada ruta
        foreach ($routes as &$route) {
            array_unshift($route, 0);
            $route[] = 0;
        }
        return $routes;
    }


}
