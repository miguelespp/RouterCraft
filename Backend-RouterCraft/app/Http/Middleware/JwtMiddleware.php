<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;


class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->user = $user;
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return \response()->json(['error' => 'Token invalid']);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return \response()->json(['error' => 'Token expired']);
        } catch (\Exception $e) {
            return \response()->json(['error' => 'Problem with the token']);
        }
        return $next($request);

    }
}
