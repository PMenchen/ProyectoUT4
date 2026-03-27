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
            'name' => 'Administrador',
            'email' => 'admin@ligamaestre.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Usuario normal
        User::create([
            'name' => 'Usuario Demo',
            'email' => 'usuario@ligamaestre.com',
            'password' => Hash::make('usuario123'),
            'role' => 'usuario',
        ]);

        // Árbitro
        User::create([
            'name' => 'Árbitro Principal',
            'email' => 'arbitro@ligamaestre.com',
            'password' => Hash::make('arbitro123'),
            'role' => 'arbitro',
        ]);

        // Capitán
        User::create([
            'name' => 'Capitán Equipo',
            'email' => 'capitan@ligamaestre.com',
            'password' => Hash::make('capitan123'),
            'role' => 'capitan',
        ]);
    }
}
