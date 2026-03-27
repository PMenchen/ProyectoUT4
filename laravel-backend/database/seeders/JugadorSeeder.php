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
            ['nombre' => 'Carlos García', 'posicion' => 'Portero', 'dorsal' => 1],
            ['nombre' => 'Miguel López', 'posicion' => 'Defensa', 'dorsal' => 4],
            ['nombre' => 'David Martín', 'posicion' => 'Centrocampista', 'dorsal' => 8],
            ['nombre' => 'Javier Sánchez', 'posicion' => 'Delantero', 'dorsal' => 9],
            ['nombre' => 'Pablo Ruiz', 'posicion' => 'Centrocampista', 'dorsal' => 10],
        ];

        foreach ($jugadoresMaestre as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'dorsal' => $jugador['dorsal'],
                'equipo_id' => $equipoMaestre->id,
            ]);
        }

        // Jugadores del Club Almagro
        $jugadoresCalatrava = [
            ['nombre' => 'Antonio Pérez', 'posicion' => 'Portero', 'dorsal' => 1],
            ['nombre' => 'Luis Fernández', 'posicion' => 'Defensa', 'dorsal' => 2],
            ['nombre' => 'Sergio Díaz', 'posicion' => 'Centrocampista', 'dorsal' => 6],
            ['nombre' => 'Raúl Torres', 'posicion' => 'Delantero', 'dorsal' => 11],
        ];

        foreach ($jugadoresCalatrava as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'dorsal' => $jugador['dorsal'],
                'equipo_id' => $equipoCalatrava->id,
            ]);
        }

        // Jugadores del Viña Albali Valdepeñas
        $jugadoresManchego = [
            ['nombre' => 'Fernando Morales', 'posicion' => 'Portero', 'dorsal' => 13],
            ['nombre' => 'Alejandro Vega', 'posicion' => 'Defensa', 'dorsal' => 3],
            ['nombre' => 'Roberto Castro', 'posicion' => 'Centrocampista', 'dorsal' => 5],
            ['nombre' => 'Daniel Romero', 'posicion' => 'Delantero', 'dorsal' => 7],
        ];

        foreach ($jugadoresManchego as $jugador) {
            Jugador::create([
                'nombre' => $jugador['nombre'],
                'posicion' => $jugador['posicion'],
                'dorsal' => $jugador['dorsal'],
                'equipo_id' => $equipoManchego->id,
            ]);
        }
    }
}
