<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seeder para crear equipos de ejemplo
 */
class EquipoSeeder extends Seeder
{
    /**
     * Poblar la tabla de equipos
     */
    public function run(): void
    {
        $capitanes = User::where('tipo', 'capitan')
            ->orderBy('id')
            ->get();

        Equipo::create([
            'nombre' => 'CD Manchego',
            'deporte' => 'Fútbol',
            'ciudad' => 'Ciudad Real',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[0]->id ?? null,
            'victorias' => 8,
            'derrotas' => 2,
            'empates' => 3,
            'puntos' => 27,
            'goles_favor' => 24,
            'goles_contra' => 12,
        ]);

        Equipo::create([
            'nombre' => 'Club Almagro',
            'deporte' => 'Fútbol',
            'ciudad' => 'Almagro',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[1]->id ?? null,
            'victorias' => 6,
            'derrotas' => 4,
            'empates' => 3,
            'puntos' => 21,
            'goles_favor' => 18,
            'goles_contra' => 15,
        ]);

        Equipo::create([
            'nombre' => 'Viña Albali Valdepeñas',
            'deporte' => 'Fútbol',
            'ciudad' => 'Valdepeñas',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[2]->id ?? null,
            'victorias' => 5,
            'derrotas' => 5,
            'empates' => 3,
            'puntos' => 18,
            'goles_favor' => 16,
            'goles_contra' => 16,
        ]);

        Equipo::create([
            'nombre' => 'CB Ciudad Real',
            'deporte' => 'Baloncesto',
            'ciudad' => 'Ciudad Real',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[3]->id ?? null,
            'victorias' => 10,
            'derrotas' => 3,
            'empates' => 0,
            'puntos' => 30,
            'goles_favor' => 1024,
            'goles_contra' => 890,
        ]);

        Equipo::create([
            'nombre' => 'CV Puertollano',
            'deporte' => 'Voleibol',
            'ciudad' => 'Puertollano',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[4]->id ?? null,
            'victorias' => 7,
            'derrotas' => 6,
            'empates' => 0,
            'puntos' => 21,
            'goles_favor' => 234,
            'goles_contra' => 221,
        ]);

        Equipo::create([
            'nombre' => 'BM Miguelturra',
            'deporte' => 'Balonmano',
            'ciudad' => 'Miguelturra',
            'categoria' => 'Primera',
            'capitan_id' => $capitanes[5]->id ?? null,
            'victorias' => 9,
            'derrotas' => 4,
            'empates' => 0,
            'puntos' => 27,
            'goles_favor' => 312,
            'goles_contra' => 278,
        ]);
    }
}
