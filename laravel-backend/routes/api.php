<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Rutas API - Liga Deportiva IES Maestre de Calatrava
|--------------------------------------------------------------------------
|
| Rutas RESTful para la gestión de equipos, jugadores, ligas y partidos.
| Las rutas de lectura (GET) son públicas.
| Las rutas de modificación (POST, PUT, DELETE) requieren autenticación
| y rol de administrador.
|
*/

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    
    // Rutas protegidas de autenticación
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// ============================================
// RUTAS PÚBLICAS (Lectura)
// ============================================

// Equipos - Rutas públicas
Route::get('/equipos', [EquipoController::class, 'index']);
Route::get('/equipos/{id}', [EquipoController::class, 'show']);

// Jugadores - Rutas públicas
Route::get('/jugadores', [JugadorController::class, 'index']);
Route::get('/jugadores/{id}', [JugadorController::class, 'show']);
Route::get('/equipos/{equipoId}/jugadores', [JugadorController::class, 'porEquipo']);

// Ligas - Rutas públicas
Route::get('/ligas', [LigaController::class, 'index']);
Route::get('/ligas/{id}', [LigaController::class, 'show']);

// Partidos - Rutas públicas
Route::get('/partidos', [PartidoController::class, 'index']);
Route::get('/partidos/{id}', [PartidoController::class, 'show']);
Route::get('/ligas/{ligaId}/partidos', [PartidoController::class, 'porLiga']);

// ============================================
// RUTAS PROTEGIDAS (Requieren Admin)
// ============================================
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    // Equipos - CRUD completo (solo admin)
    Route::post('/equipos', [EquipoController::class, 'store']);
    Route::put('/equipos/{id}', [EquipoController::class, 'update']);
    Route::delete('/equipos/{id}', [EquipoController::class, 'destroy']);

    // Jugadores - CRUD completo (solo admin)
    Route::post('/jugadores', [JugadorController::class, 'store']);
    Route::put('/jugadores/{id}', [JugadorController::class, 'update']);
    Route::delete('/jugadores/{id}', [JugadorController::class, 'destroy']);

    // Ligas - CRUD completo (solo admin)
    Route::post('/ligas', [LigaController::class, 'store']);
    Route::put('/ligas/{id}', [LigaController::class, 'update']);
    Route::delete('/ligas/{id}', [LigaController::class, 'destroy']);

    // Partidos - CRUD completo (solo admin)
    Route::post('/partidos', [PartidoController::class, 'store']);
    Route::put('/partidos/{id}', [PartidoController::class, 'update']);
    Route::delete('/partidos/{id}', [PartidoController::class, 'destroy']);
});
