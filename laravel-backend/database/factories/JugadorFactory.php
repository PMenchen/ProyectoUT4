<?php

namespace Database\Factories;

use App\Models\Jugador;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jugador>
 */
class JugadorFactory extends Factory
{
    protected $model = Jugador::class;

    public function definition(): array
    {
        return [
            'nombre'       => $this->faker->name(),
            'posicion'     => $this->faker->randomElement(['Delantero', 'Defensa', 'Portero', 'Centrocampista']),
            'numero'       => $this->faker->numberBetween(1, 99),
            'equipo_id'    => 1, // usa un equipo que exista en tus seeds
            'deporte'      => 'Fútbol',
            'estadisticas' => ['goles' => $this->faker->numberBetween(0, 30), 'partidos' => $this->faker->numberBetween(1, 38)],
            'foto'         => null,
        ];
    }
}