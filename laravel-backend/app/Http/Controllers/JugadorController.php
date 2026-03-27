<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controlador para gestionar jugadores
 * 
 * Implementa operaciones CRUD completas para la entidad Jugador
 */
class JugadorController extends Controller
{
    /**
     * Listar todos los jugadores
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $jugadores = Jugador::with('equipo')->get();
        
        return response()->json([
            'success' => true,
            'data' => $jugadores,
            'message' => 'Listado de jugadores obtenido correctamente'
        ]);
    }

    /**
     * Mostrar un jugador específico
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $jugador = Jugador::with('equipo')->find($id);

        if (!$jugador) {
            return response()->json([
                'success' => false,
                'message' => 'Jugador no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $jugador,
            'message' => 'Jugador obtenido correctamente'
        ]);
    }

    /**
     * Crear un nuevo jugador
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'posicion' => 'required|string|max:100',
            'dorsal' => 'required|integer|min:1|max:99',
            'equipo_id' => 'required|exists:equipos,id',
        ]);

        $jugador = Jugador::create($validated);
        $jugador->load('equipo');

        return response()->json([
            'success' => true,
            'data' => $jugador,
            'message' => 'Jugador creado correctamente'
        ], 201);
    }

    /**
     * Actualizar un jugador existente
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $jugador = Jugador::find($id);

        if (!$jugador) {
            return response()->json([
                'success' => false,
                'message' => 'Jugador no encontrado'
            ], 404);
        }

        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'posicion' => 'sometimes|required|string|max:100',
            'dorsal' => 'sometimes|required|integer|min:1|max:99',
            'equipo_id' => 'sometimes|required|exists:equipos,id',
        ]);

        $jugador->update($validated);
        $jugador->load('equipo');

        return response()->json([
            'success' => true,
            'data' => $jugador,
            'message' => 'Jugador actualizado correctamente'
        ]);
    }

    /**
     * Eliminar un jugador
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $jugador = Jugador::find($id);

        if (!$jugador) {
            return response()->json([
                'success' => false,
                'message' => 'Jugador no encontrado'
            ], 404);
        }

        $jugador->delete();

        return response()->json([
            'success' => true,
            'data'=>null,
            'message' => 'Jugador eliminado correctamente'
        ]);
    }

    /**
     * Obtener jugadores por equipo
     * 
     * @param int $equipoId
     * @return JsonResponse
     */
    public function porEquipo(int $equipoId): JsonResponse
    {
        $jugadores = Jugador::where('equipo_id', $equipoId)->with('equipo')->get();

        return response()->json([
            'success' => true,
            'data' => $jugadores,
            'message' => 'Jugadores del equipo obtenidos correctamente'
        ]);
    }
}
