<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Controlador para gestionar ligas
 * 
 * Implementa operaciones CRUD completas para la entidad Liga
 */
class LigaController extends Controller
{
    /**
     * Listar todas las ligas
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $ligas = Liga::with('partidos')->get();
        
        return response()->json([
            'success' => true,
            'data' => $ligas,
            'message' => 'Listado de ligas obtenido correctamente'
        ]);
    }

    /**
     * Mostrar una liga específica
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $liga = Liga::with(['partidos.equipoLocal', 'partidos.equipoVisitante'])->find($id);

        if (!$liga) {
            return response()->json([
                'success' => false,
                'message' => 'Liga no encontrada'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $liga,
            'message' => 'Liga obtenida correctamente'
        ]);
    }

    /**
     * Crear una nueva liga
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'deporte' => 'required|string|max:100',
            'temporada' => 'required|string|max:20',
        ]);

        $liga = Liga::create($validated);

        return response()->json([
            'success' => true,
            'data' => $liga,
            'message' => 'Liga creada correctamente'
        ], 201);
    }

    /**
     * Actualizar una liga existente
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $liga = Liga::find($id);

        if (!$liga) {
            return response()->json([
                'success' => false,
                'message' => 'Liga no encontrada'
            ], 404);
        }

        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'deporte' => 'sometimes|required|string|max:100',
            'temporada' => 'sometimes|required|string|max:20',
        ]);

        $liga->update($validated);

        return response()->json([
            'success' => true,
            'data' => $liga,
            'message' => 'Liga actualizada correctamente'
        ]);
    }

    /**
     * Eliminar una liga
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $liga = Liga::find($id);

        if (!$liga) {
            return response()->json([
                'success' => false,
                'message' => 'Liga no encontrada'
            ], 404);
        }

        $liga->delete();

        return response()->json([
            'success' => true,
            'message' => 'Liga eliminada correctamente'
        ]);
    }
}
