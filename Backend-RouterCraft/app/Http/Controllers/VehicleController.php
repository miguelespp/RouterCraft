<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $vehicles = Vehicle::where('user_id', $request->user->id)->get();
        return response()->json(compact('vehicles'), 200);
    }

    public function show(Request $request)
    {
        $vehicle = Vehicle::find($request->vehicle->id);
        return response()->json(compact('vehicle'), 200);
    }

    public function destroy(Request $request)
    {
        $vehicle = Vehicle::find($request->vehicle->id);
        $vehicle->delete();
        return response()->json(['message' => 'Vehicle deleted'], 200);
    }

    public function store(Request $request)
    {
        $vehicle = Vehicle::create([
            'model' => $request->model,
            'capacity' => $request->capacity,
            'user_id' => $request->user->id,
        ]);
        return response()->json(compact('vehicle'), 200);
    }

}
