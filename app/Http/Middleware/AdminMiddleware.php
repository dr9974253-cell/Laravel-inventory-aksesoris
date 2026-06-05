<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Akses ditolak. Hanya admin yang dapat mengakses fitur ini.'], 403);
            }

            return redirect()->route('dashboard')->with('error', 'Akses ditolak. Hanya admin yang dapat mengakses fitur ini.');
        }

        return $next($request);
    }
}