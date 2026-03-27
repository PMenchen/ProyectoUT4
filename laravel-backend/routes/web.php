<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenido a la API de Liga Deportiva',
        'version' => '1.0.0',
        'endpoints' => [
            'equipos' => '/api/equipos',
            'jugadores' => '/api/jugadores',
            'ligas' => '/api/ligas',
            'partidos' => '/api/partidos',
            'auth' => '/api/auth/login'
        ]
    ]);
});
