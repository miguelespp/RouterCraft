<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\OperationController;
use App\Http\Controllers\VehicleController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware('jwt.verify')->group(function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('users', [UserController::class, 'index']);
    Route::delete('user', [UserController::class, 'destroy']);
    
    //Manejar operaciones
    Route::get('operations', [OperationController::class, 'index']);
    Route::post('operations', [OperationController::class, 'store']);

    //Manejar vehiculos
    Route::post('vehicles', [VehicleController::class, 'store']);

    //Falta manejar rutas
    Route::post('routes', [RouteController::class, 'store']);
});
