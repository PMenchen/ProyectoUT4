<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controlador para gestionar partidos
 * 
 * Implementa operaciones CRUD completas para la entidad Partido
 */
class PartidoController extends Controller
{
    /**
     * Listar todos los partidos
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $partidos = Partido::with(['liga', 'equipoLocal', 'equipoVisitante'])->get();
        
        return response()->json([
            'success' => true,
            'data' => $partidos,
            'message' => 'Listado de partidos obtenido correctamente'
        ]);
    }

    /**
     * Mostrar un partido específico
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $partido = Partido::with(['liga', 'equipoLocal', 'equipoVisitante'])->find($id);

        if (!$partido) {
            return response()->json([
                'success' => false,
                'message' => 'Partido no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $partido,
            'message' => 'Partido obtenido correctamente'
        ]);
    }

    /**
     * Crear un nuevo partido
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validación de datos
        $validated = $request->validate([
            'liga_id' => 'required|exists:ligas,id',
            'equipo_local_id' => 'required|exists:equipos,id',
            'equipo_visitante_id' => 'required|exists:equipos,id|different:equipo_local_id',
            'fecha' => 'required|date',
            'resultado' => 'nullable|string|regex:/^\d+-\d+$/',
        ]);

        $partido = Partido::create($validated);
        $partido->load(['liga', 'equipoLocal', 'equipoVisitante']);

        return response()->json([
            'success' => true,
            'data' => $partido,
            'message' => 'Partido creado correctamente'
        ], 201);
    }

    /**
     * Actualizar un partido existente
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $partido = Partido::find($id);

        if (!$partido) {
            return response()->json([
                'success' => false,
                'message' => 'Partido no encontrado'
            ], 404);
        }

        // Validación de datos
        $validated = $request->validate([
            'liga_id' => 'sometimes|required|exists:ligas,id',
            'equipo_local_id' => 'sometimes|required|exists:equipos,id',
            'equipo_visitante_id' => 'sometimes|required|exists:equipos,id',
            'fecha' => 'sometimes|required|date',
            'resultado' => 'nullable|string|regex:/^\d+-\d+$/',
        ]);

        $partido->update($validated);
        $partido->load(['liga', 'equipoLocal', 'equipoVisitante']);

        return response()->json([
            'success' => true,
            'data' => $partido,
            'message' => 'Partido actualizado correctamente'
        ]);
    }

    /**
     * Eliminar un partido
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $partido = Partido::find($id);

        if (!$partido) {
            return response()->json([
                'success' => false,
                'message' => 'Partido no encontrado'
            ], 404);
        }

        $partido->delete();

        return response()->json([
            'success' => true,
            'message' => 'Partido eliminado correctamente'
        ]);
    }

    /**
     * Obtener partidos por liga
     * 
     * @param int $ligaId
     * @return JsonResponse
     */
    public function porLiga(int $ligaId): JsonResponse
    {
        $partidos = Partido::where('liga_id', $ligaId)
            ->with(['liga', 'equipoLocal', 'equipoVisitante'])
            ->orderBy('fecha')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $partidos,
            'message' => 'Partidos de la liga obtenidos correctamente'
        ]);
    }
}
