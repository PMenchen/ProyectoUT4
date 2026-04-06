<?php

namespace Database\Factories;

use App\Models\Equipo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory para el modelo Equipo
 * 
 * Genera datos de prueba para equipos deportivos.
 * 
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipo>
 */
class EquipoFactory extends Factory
{
    protected $model = Equipo::class;

    /**
     * Define el estado por defecto del modelo
     */
    public function definition(): array
    {
        return [
            'nombre'       => $this->faker->company() . ' FC',
            'deporte'      => $this->faker->randomElement(['Fútbol', 'Baloncesto', 'Voleibol', 'Balonmano']),
            'ciudad'       => $this->faker->city(),
            'categoria'    => $this->faker->randomElement(['Primera', 'Segunda', 'Juvenil', 'Cadete']),
            'capitan_id'   => User::factory()->state(['tipo' => 'capitan']),
            'victorias'    => $this->faker->numberBetween(0, 20),
            'derrotas'     => $this->faker->numberBetween(0, 15),
            'empates'      => $this->faker->numberBetween(0, 10),
            'puntos'       => $this->faker->numberBetween(0, 70),
            'goles_favor'  => $this->faker->numberBetween(0, 50),
            'goles_contra' => $this->faker->numberBetween(0, 40),
            'escudo'       => null,
        ];
    }

    /**
     * Estado: Equipo sin capitán asignado
     */
    public function sinCapitan(): static
    {
        return $this->state(fn (array $attributes) => [
            'capitan_id' => null,
        ]);
    }

    /**
     * Estado: Equipo de fútbol
     */
    public function futbol(): static
    {
        return $this->state(fn (array $attributes) => [
            'deporte' => 'Fútbol',
        ]);
    }

    /**
     * Estado: Equipo de baloncesto
     */
    public function baloncesto(): static
    {
        return $this->state(fn (array $attributes) => [
            'deporte' => 'Baloncesto',
        ]);
    }
}
