<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seeder para crear usuarios de prueba
 */
class UserSeeder extends Seeder
{
    /**
     * Poblar la tabla de usuarios
     */
    public function run(): void
    {
        // Usuario administrador
        User::create([
            'nombre' => 'Administrador',
            'email' => 'admin@ligamaestre.com',
            'password' => Hash::make('admin123'),
            'tipo' => 'admin',
        ]);

        // Usuario normal
        User::create([
            'nombre' => 'Usuario Demo',
            'email' => 'usuario@ligamaestre.com',
            'password' => Hash::make('usuario123'),
            'tipo' => 'usuario',
        ]);

        // Árbitro
        User::create([
            'nombre' => 'Árbitro Principal',
            'email' => 'arbitro@ligamaestre.com',
            'password' => Hash::make('arbitro123'),
            'tipo' => 'arbitro',
        ]);

        // Capitán
        // User::create([
        //     'nombre' => 'Capitán Equipo',
        //     'email' => 'capitan@ligamaestre.com',
        //     'password' => Hash::make('capitan123'),
        //     'tipo' => 'capitan',
        // ]);

        // Capitanes de equipos
        User::create([
            'nombre' => 'Carlos García Martínez',
            'email' => 'carlos.garcia@cdmanchego.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);

        User::create([
            'nombre' => 'Miguel López Ruiz',
            'email' => 'miguel.lopez@clubalmagro.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);

        User::create([
            'nombre' => 'Javier Sánchez Torres',
            'email' => 'javier.sanchez@vinaalbali.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);

        User::create([
            'nombre' => 'Antonio Fernández Gil',
            'email' => 'antonio.fernandez@cbciudadreal.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);

        User::create([
            'nombre' => 'Luis Martín Gómez',
            'email' => 'luis.martin@cvpuertollano.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);

        User::create([
            'nombre' => 'David Rodríguez Pérez',
            'email' => 'david.rodriguez@bmmiguelturra.com',
            'password' => Hash::make('capitan123'),
            'tipo' => 'capitan',
        ]);
    }
}
