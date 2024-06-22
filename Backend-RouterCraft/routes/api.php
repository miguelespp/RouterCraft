<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware([JwtMiddleware::class])->prefix('auth')->group(function(){
    // Route::get('user', [AuthController::class, 'user']);
//    Route::get('logout', [AuthController::class, 'logout']);
//    Route::get('users', [\App\Http\Controllers\User\UserController::class, 'index']);
});
