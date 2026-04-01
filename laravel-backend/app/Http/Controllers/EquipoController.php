<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controlador para gestionar equipos
 * 
 * Implementa operaciones CRUD completas para la entidad Equipo
 */
class EquipoController extends Controller
{
    /**
     * Listar todos los equipos
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $equipos = Equipo::with(['jugadores', 'capitan'])->get();
        
        return response()->json([
            'success' => true,
            'data' => $equipos,
            'message' => 'Listado de equipos obtenido correctamente'
        ]);
    }

    /**
     * Mostrar un equipo específico
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $equipo = Equipo::with(['jugadores', 'capitan'])->find($id);

        if (!$equipo) {
            return response()->json([
                'success' => false,
                'message' => 'Equipo no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $equipo,
            'message' => 'Equipo obtenido correctamente'
        ]);
    }

    /**
     * Crear un nuevo equipo
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'categoria' => 'required|string|max:100',
        ]);

        $equipo = Equipo::create($validated);

        return response()->json([
            'success' => true,
            'data' => $equipo,
            'message' => 'Equipo creado correctamente'
        ], 201);
    }

    /**
     * Actualizar un equipo existente
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $equipo = Equipo::find($id);

        if (!$equipo) {
            return response()->json([
                'success' => false,
                'message' => 'Equipo no encontrado'
            ], 404);
        }

        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'ciudad' => 'sometimes|required|string|max:255',
            'categoria' => 'sometimes|required|string|max:100',
        ]);

        $equipo->update($validated);

        return response()->json([
            'success' => true,
            'data' => $equipo,
            'message' => 'Equipo actualizado correctamente'
        ]);
    }

    /**
     * Eliminar un equipo
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $equipo = Equipo::find($id);

        if (!$equipo) {
            return response()->json([
                'success' => false,
                'message' => 'Equipo no encontrado'
            ], 404);
        }

        $equipo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Equipo eliminado correctamente'
        ]);
    }
}
