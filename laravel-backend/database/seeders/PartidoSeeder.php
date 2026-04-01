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

        $equipos = Equipo::all();

        $equipoManchego = Equipo::where('nombre', 'CD Manchego')->first();
        $equipoAlmagro = Equipo::where('nombre', 'Club Almagro')->first();
        $equipoValde = Equipo::where('nombre', 'Viña Albali Valdepeñas')->first();
        $equipoCiudadReal = Equipo::where('nombre', 'CB Ciudad Real')->first();
        $equipoPuertollano = Equipo::where('nombre', 'CV Puertollano')->first();
        $equipoMiguelturra = Equipo::where('nombre', 'BM Miguelturra')->first();

        // Jornada 1
        Partido::create([
            'liga_id' => $ligaFutbol->id,
            'equipo_local_id' => $equipoManchego->id,
            'equipo_visitante_id' => $equipoAlmagro->id,
            'deporte' => 'Fútbol',
            'fecha' => '2025-01-15',
            'hora' => '17:00:00',
            'ubicacion' => 'Campo Municipal IES Maestre de Calatrava',
            'arbitro_id' => null,
            'goles_local' => 2,
            'goles_visitante' => 1,
            'estado' => 'finalizado',
            'jornada' => 1,
        ]);

        Partido::create([
            'liga_id' => $ligaFutbol?->id,
            'equipo_local_id' => $equipoValde->id,
            'equipo_visitante_id' => $equipoManchego->id,
            'deporte' => 'Fútbol',
            'fecha' => '2025-01-22',
            'hora' => '18:00:00',
            'ubicacion' => 'Polideportivo Valdepeñas',
            'arbitro_id' => null,
            'goles_local' => 0,
            'goles_visitante' => 3,
            'estado' => 'finalizado',
            'jornada' => 2,
        ]);

        Partido::create([
            'liga_id' => $ligaFutbol?->id,
            'equipo_local_id' => $equipoAlmagro->id,
            'equipo_visitante_id' => $equipoValde->id,
            'deporte' => 'Fútbol',
            'fecha' => '2025-01-29',
            'hora' => '17:30:00',
            'ubicacion' => 'Estadio Municipal Almagro',
            'arbitro_id' => null,
            'goles_local' => 1,
            'goles_visitante' => 1,
            'estado' => 'finalizado',
            'jornada' => 3,
        ]);

        // Partidos de Baloncesto - Finalizados
        Partido::create([
            'liga_id' => null,
            'equipo_local_id' => $equipoCiudadReal->id,
            'equipo_visitante_id' => $equipoManchego->id,
            'deporte' => 'Baloncesto',
            'fecha' => '2025-01-18',
            'hora' => '19:00:00',
            'ubicacion' => 'Pabellón Ciudad Real',
            'arbitro_id' => null,
            'goles_local' => 78,
            'goles_visitante' => 65,
            'estado' => 'finalizado',
            'jornada' => 1,
        ]);

        Partido::create([
            'liga_id' => null,
            'equipo_local_id' => $equipoManchego->id,
            'equipo_visitante_id' => $equipoCiudadReal->id,
            'deporte' => 'Baloncesto',
            'fecha' => '2025-01-25',
            'hora' => '19:30:00',
            'ubicacion' => 'Polideportivo IES Maestre',
            'arbitro_id' => null,
            'goles_local' => 72,
            'goles_visitante' => 69,
            'estado' => 'finalizado',
            'jornada' => 2,
        ]);

        // Partidos de Voleibol - Finalizados
        Partido::create([
            'liga_id' => null,
            'equipo_local_id' => $equipoPuertollano->id,
            'equipo_visitante_id' => $equipoCiudadReal->id,
            'deporte' => 'Voleibol',
            'fecha' => '2025-01-20',
            'hora' => '18:00:00',
            'ubicacion' => 'Pabellón Puertollano',
            'arbitro_id' => null,
            'goles_local' => 3,
            'goles_visitante' => 1,
            'estado' => 'finalizado',
            'jornada' => 1,
        ]);

        // Partidos de Balonmano - Finalizados
        Partido::create([
            'liga_id' => null,
            'equipo_local_id' => $equipoMiguelturra->id,
            'equipo_visitante_id' => $equipoAlmagro->id,
            'deporte' => 'Balonmano',
            'fecha' => '2025-01-17',
            'hora' => '20:00:00',
            'ubicacion' => 'Polideportivo Miguelturra',
            'arbitro_id' => null,
            'goles_local' => 28,
            'goles_visitante' => 25,
            'estado' => 'finalizado',
            'jornada' => 1,
        ]);

        // Partidos Pendientes
        Partido::create([
            'liga_id' => $ligaFutbol?->id,
            'equipo_local_id' => $equipoManchego->id,
            'equipo_visitante_id' => $equipoValde->id,
            'deporte' => 'Fútbol',
            'fecha' => '2025-04-15',
            'hora' => '17:00:00',
            'ubicacion' => 'Campo Municipal IES Maestre de Calatrava',
            'arbitro_id' => null,
            'goles_local' => 0,
            'goles_visitante' => 0,
            'estado' => 'pendiente',
            'jornada' => 4,
        ]);

        Partido::create([
            'liga_id' => null,
            'equipo_local_id' => $equipoCiudadReal->id,
            'equipo_visitante_id' => $equipoPuertollano->id,
            'deporte' => 'Baloncesto',
            'fecha' => '2025-04-20',
            'hora' => '19:00:00',
            'ubicacion' => 'Pabellón Ciudad Real',
            'arbitro_id' => null,
            'goles_local' => 0,
            'goles_visitante' => 0,
            'estado' => 'pendiente',
            'jornada' => 3,
        ]);
    }
}
