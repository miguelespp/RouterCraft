<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Models\Operation;
use App\Models\Storage;
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

    public function store(Request $request)
    {
        // return response()->json($request->all(), 200);
        // return response()->json($request->user, 200);
        $operation = Operation::create([
            'name' => $request->name,
            'user_id' => $request->user->id,
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

    private function getDistance(Request $request)
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/distancematrix/json', [
            'origins' => '-12.125433, -76.871839',
            'destinations' => '-12.093231 , -76.881340',
            'mode' => 'driving',
            'key' => env('APP_GOOGLE_MAPS_API_KEY'),
        ]);

        if ($response->successful()) {
            $data = $response->json();
            // return response()->json($data, 200);
            // Verificar el estado de la respuesta
            if (isset($data['status']) && $data['status'] == 'OK' && isset($data['rows'][0]['elements'][0]['status']) && $data['rows'][0]['elements'][0]['status'] == 'OK') {
                $element = $data['rows'][0]['elements'][0];
                $result = [
                    'distance' => $element['distance']['text'],
                    'duration' => $element['duration']['text'],
                ];
                return response()->json($result, 200);
            } else {
                return response()->json(['error' => 'No se pudo encontrar una ruta entre los puntos proporcionados'], 400);
            }
        } else {
            return response()->json(['error' => 'No se pudo obtener la información de la distancia'], 500);
        }
    }

}
