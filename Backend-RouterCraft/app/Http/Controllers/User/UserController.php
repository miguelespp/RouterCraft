<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        return response()->json(compact('users'), 200);
    }

    public function show(Request $request)
    {
        $user = User::find($request->user->id);
        return response()->json(compact('user'), 200);
    }

    public function update(Request $request)
    {
        $user = User::find($request->user->id);
        $user->update($request->all());
        return response()->json(compact('user'), 200);
    }

    public function destroy(Request $request)
    {
        $user = User::find($request->user->id);
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }

//    public function store(Request $request)
//    {
//        $user = User::create($request->all());
//        return response()->json(compact('user'), 200);
//    }
}
