<?php

namespace Database\Seeders;

use App\Models\Liga;
use Illuminate\Database\Seeder;

/**
 * Seeder para crear ligas de ejemplo
 */
class LigaSeeder extends Seeder
{
    /**
     * Poblar la tabla de ligas
     */
    public function run(): void
    {
        Liga::create([
            'nombre' => 'Liga Intercentros Fútbol',
            'deporte' => 'Fútbol',
            'temporada' => '2024-2025',
        ]);

        Liga::create([
            'nombre' => 'Torneo Baloncesto IES',
            'deporte' => 'Baloncesto',
            'temporada' => '2024-2025',
        ]);
    }
}
