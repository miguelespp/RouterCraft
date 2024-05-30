<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        
        ]);

        $token = JWTAuth::fromUser($user);
        return response()->json([
            compact('user', 'token')
        ], 200);
    }

    public function login(LoginRequest $request){
        $credentials = $request->only('email', 'password');
        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json([
                'success' => false,
                'message' => 'invalid credentials'
            ], 401);
        }
        $user = User::where('email', $request->email)->first();

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token
        ], 200);
    }
}
