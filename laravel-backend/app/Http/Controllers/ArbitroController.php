<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controlador para gestionar árbitros
 *
 * Implementa operaciones CRUD para usuarios con rol de árbitro
 */
class ArbitroController extends Controller
{
    /**
     * Listar todos los árbitros
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $arbitros = User::where('tipo', 'arbitro')->get();

        return response()->json([
            'success' => true,
            'data' => $arbitros,
            'message' => 'Listado de árbitros obtenido correctamente'
        ]);
    }

    /**
     * Mostrar un árbitro específico
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $arbitro = User::where('tipo', 'arbitro')->find($id);

        if (!$arbitro) {
            return response()->json([
                'success' => false,
                'message' => 'Árbitro no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $arbitro,
            'message' => 'Árbitro obtenido correctamente'
        ]);
    }

    /**
     * Crear un nuevo árbitro
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $validated['tipo'] = 'arbitro';
        $validated['password'] = bcrypt($validated['password']);

        $arbitro = User::create($validated);

        return response()->json([
            'success' => true,
            'data' => $arbitro,
            'message' => 'Árbitro creado correctamente'
        ], 201);
    }

    /**
     * Actualizar un árbitro existente
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $arbitro = User::where('tipo', 'arbitro')->find($id);

        if (!$arbitro) {
            return response()->json([
                'success' => false,
                'message' => 'Árbitro no encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:6',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $arbitro->update($validated);

        return response()->json([
            'success' => true,
            'data' => $arbitro,
            'message' => 'Árbitro actualizado correctamente'
        ]);
    }

    /**
     * Eliminar un árbitro
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $arbitro = User::where('tipo', 'arbitro')->find($id);

        if (!$arbitro) {
            return response()->json([
                'success' => false,
                'message' => 'Árbitro no encontrado'
            ], 404);
        }

        $arbitro->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Árbitro eliminado correctamente'
        ]);
    }
}
