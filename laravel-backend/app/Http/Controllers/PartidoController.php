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
        $partidos = Partido::with(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro'])->get();
        
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
        $partido = Partido::with(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro'])->find($id);

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
            'deporte' => 'required|string',
            'fecha' => 'required|date',
            'hora' => 'required',
            'ubicacion' => 'required|string',
            'arbitro_id' => 'nullable|exists:users,id',
            'goles_local' => 'integer|min:0',
            'goles_visitante' => 'integer|min:0',
            'estado' => 'required|in:pendiente,en_progreso,finalizado,cancelado',
            'jornada' => 'nullable|integer',
            'observaciones' => 'nullable|string',
        ]);

        $partido = Partido::create($validated);
        $partido->load(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro']);

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
            'deporte' => 'sometimes|required|string',
            'fecha' => 'sometimes|required|date',
            'hora' => 'sometimes|required',
            'ubicacion' => 'sometimes|required|string',
            'arbitro_id' => 'nullable|exists:users,id',
            'goles_local' => 'integer|min:0',
            'goles_visitante' => 'integer|min:0',
            'estado' => 'sometimes|required|in:pendiente,en_progreso,finalizado,cancelado',
            'jornada' => 'nullable|integer',
            'observaciones' => 'nullable|string',
        ]);

        $partido->update($validated);
        $partido->load(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro']);

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
            ->with(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro'])
            ->orderBy('fecha')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $partidos,
            'message' => 'Partidos de la liga obtenidos correctamente'
        ]);
    }

    /**
     * Obtener partidos por árbitro
     */
    public function porArbitro(int $arbitroId): JsonResponse
    {
        $partidos = Partido::where('arbitro_id', $arbitroId)
            ->with(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro'])
            ->orderBy('fecha')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $partidos,
            'message' => 'Partidos del árbitro obtenidos correctamente'
        ]);
    }

    /**
     * Obtener partidos por equipo
     */
    public function porEquipo(int $equipoId): JsonResponse
    {
        $partidos = Partido::where('equipo_local_id', $equipoId)
            ->orWhere('equipo_visitante_id', $equipoId)
            ->with(['liga', 'equipoLocal', 'equipoVisitante', 'arbitro'])
            ->orderBy('fecha')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $partidos,
            'message' => 'Partidos del equipo obtenidos correctamente'
        ]);
    }
}
