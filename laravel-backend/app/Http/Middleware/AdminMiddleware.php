<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware para verificar rol de administrador
 * 
 * Permite acceso solo a usuarios con rol 'admin'.
 * Debe usarse en rutas que requieren modificaciones (crear, editar, eliminar).
 */
class AdminMiddleware
{
    /**
     * Manejar la petición entrante
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el usuario está autenticado
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado. Debe iniciar sesión.'
            ], 401);
        }

        // Verificar si el usuario es administrador
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado. Se requiere rol de administrador.'
            ], 403);
        }

        return $next($request);
    }
}
