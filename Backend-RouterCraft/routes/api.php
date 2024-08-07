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
//    Route::get('users', [UserController::class, 'index']);
    Route::get('user', [UserController::class, 'show']);
    Route::put('user', [UserController::class, 'update']);
    Route::delete('user', [UserController::class, 'destroy']);

    //Manejar operaciones
    // obtienes un arreglo de operaciones  (primero)
    Route::get('operations', [OperationController::class, 'index']);
    // crea una operacion (este no se muestra)
    Route::post('operations', [OperationController::class, 'store']);
    // obtienes una operacion insertando enviando solo el operation _id
    // te dara las rutas para que las implementes con polylines (tercero)
    Route::post('operations/routes', [OperationController::class, 'getRoutes']);
    Route::delete('operations', [OperationController::class, 'destroy']);

    //Manejar vehiculos
    Route::get('vehicles', [VehicleController::class, 'index']);
    Route::post('vehicles', [VehicleController::class, 'store']);
    Route::delete('vehicles', [VehicleController::class, 'destroy']);

    //Falta manejar rutas
    // Route::post('routes', [RouteController::class, 'store']);
});
