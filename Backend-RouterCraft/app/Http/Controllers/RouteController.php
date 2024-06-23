<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RouteController extends Controller
{
    public function store(Request $request)
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/distancematrix/json', [
            'origin' => 'New York, NY',
            'destination' => 'Los Angeles, CA',
            'mode' => 'driving',
            'key' => env('APP_GOOGLE_MAPS_API_KEY'),
        ]);

        if ($response->successful()) {
            $data = $response->json();

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
