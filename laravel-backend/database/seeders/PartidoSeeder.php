<?php

namespace Database\Seeders;

use App\Models\Partido;
use App\Models\Liga;
use App\Models\Equipo;
use Illuminate\Database\Seeder;

/**
 * Seeder para crear partidos de ejemplo
 */
class PartidoSeeder extends Seeder
{
    /**
     * Poblar la tabla de partidos
     */
    public function run(): void
    {
        $ligaFutbol = Liga::where('nombre', 'Liga Intercentros Fútbol')->first();
        $equipoManchego = Equipo::where('nombre', 'CD Manchego')->first();
        $equipoAlmagro = Equipo::where('nombre', 'Club Almagro')->first();
        $equipoValde = Equipo::where('nombre', 'Viña Albali Valdepeñas')->first();

        // Jornada 1
        Partido::create([
            'liga_id' => $ligaFutbol->id,
            'equipo_local_id' => $equipoManchego->id,
            'equipo_visitante_id' => $equipoAlmagro->id,
            'fecha' => '2025-02-10 17:00:00',
            'resultado' => '2-1',
        ]);

        Partido::create([
            'liga_id' => $ligaFutbol->id,
            'equipo_local_id' => $equipoValde->id,
            'equipo_visitante_id' => $equipoManchego->id,
            'fecha' => '2025-02-17 18:00:00',
            'resultado' => '0-3',
        ]);

        // Jornada 2
        Partido::create([
            'liga_id' => $ligaFutbol->id,
            'equipo_local_id' => $equipoAlmagro->id,
            'equipo_visitante_id' => $equipoValde->id,
            'fecha' => '2025-02-24 17:30:00',
            'resultado' => '1-1',
        ]);

        // Partido pendiente
        Partido::create([
            'liga_id' => $ligaFutbol->id,
            'equipo_local_id' => $equipoManchego->id,
            'equipo_visitante_id' => $equipoValde->id,
            'fecha' => '2025-03-03 17:00:00',
            'resultado' => null,
        ]);
    }
}
