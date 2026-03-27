<?php

namespace Database\Seeders;

use App\Models\Equipo;
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
        Equipo::create([
            'nombre' => 'CD Manchego',
            'ciudad' => 'Ciudad Real',
            'categoria' => 'Primera',
        ]);

        Equipo::create([
            'nombre' => 'Club Almagro',
            'ciudad' => 'Almagro',
            'categoria' => 'Primera',
        ]);

        Equipo::create([
            'nombre' => 'Viña Albali Valdepeñas',
            'ciudad' => 'Valdepeñas',
            'categoria' => 'Primera',
        ]);
    }
}
