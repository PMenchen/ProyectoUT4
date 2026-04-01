<?php

namespace Database\Seeders;

use App\Models\Jugador;
use App\Models\Equipo;
use Illuminate\Database\Seeder;

/**
 * Seeder para crear jugadores de ejemplo
 */
class JugadorSeeder extends Seeder
{
    /**
     * Poblar la tabla de jugadores
     */
    public function run(): void
    {
        $equipoMaestre = Equipo::where('nombre', 'CD Manchego')->first();
        $equipoCalatrava = Equipo::where('nombre', 'Club Almagro')->first();
        $equipoManchego = Equipo::where('nombre', 'Viña Albali Valdepeñas')->first();

        // Jugadores del CD Manchego
        $jugadoresMaestre = [
            ['nombre' => 'Carlos García', 'posicion' => 'Portero', 'numero' => 1],
            ['nombre' => 'Miguel López', 'posicion' => 'Defensa', 'numero' => 4],
            ['nombre' => 'David Martín', 'posicion' => 'Centrocampista', 'numero' => 8],
            ['nombre' => 'Javier Sánchez', 'posicion' => 'Delantero', 'numero' => 9],
            ['nombre' => 'Pablo Ruiz', 'posicion' => 'Centrocampista', 'numero' => 10],
        ];

        foreach ($jugadoresMaestre as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'numero' => $jugador['numero'],
                'equipo_id' => $equipoMaestre->id,
                'deporte' => 'Fútbol',
                'estadisticas' => [
                    'partidosJugados' => rand(10, 30),
                    'goles' => rand(0, 15),
                    'asistencias' => rand(0, 10),
                    'tarjetasAmarillas' => rand(0, 5),
                    'tarjetasRojas' => rand(0, 2),
                ],
            ]);
        }

        // Jugadores del Club Almagro
        $jugadoresCalatrava = [
            ['nombre' => 'Antonio Pérez', 'posicion' => 'Portero', 'numero' => 1],
            ['nombre' => 'Luis Fernández', 'posicion' => 'Defensa', 'numero' => 2],
            ['nombre' => 'Sergio Díaz', 'posicion' => 'Centrocampista', 'numero' => 6],
            ['nombre' => 'Raúl Torres', 'posicion' => 'Delantero', 'numero' => 11],
        ];

        foreach ($jugadoresCalatrava as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'numero' => $jugador['numero'],
                'equipo_id' => $equipoCalatrava->id,
                'deporte' => 'Fútbol',
                'estadisticas' => [
                    'partidosJugados' => rand(10, 30),
                    'goles' => rand(0, 15),
                    'asistencias' => rand(0, 10),
                    'tarjetasAmarillas' => rand(0, 5),
                    'tarjetasRojas' => rand(0, 2),
                ],
            ]);
        }

        // Jugadores del Viña Albali Valdepeñas
        $jugadoresManchego = [
            ['nombre' => 'Fernando Morales', 'posicion' => 'Portero', 'numero' => 13],
            ['nombre' => 'Alejandro Vega', 'posicion' => 'Defensa', 'numero' => 3],
            ['nombre' => 'Roberto Castro', 'posicion' => 'Centrocampista', 'numero' => 5],
            ['nombre' => 'Daniel Romero', 'posicion' => 'Delantero', 'numero' => 7],
        ];

        foreach ($jugadoresManchego as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'numero' => $jugador['numero'],
                'equipo_id' => $equipoManchego->id,
                'deporte' => 'Fútbol',
                'estadisticas' => [
                    'partidosJugados' => rand(10, 30),
                    'goles' => rand(0, 15),
                    'asistencias' => rand(0, 10),
                    'tarjetasAmarillas' => rand(0, 5),
                    'tarjetasRojas' => rand(0, 2),
                ],
            ]);
        }
    }
}
