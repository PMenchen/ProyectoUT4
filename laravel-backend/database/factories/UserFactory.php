<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * Factory para el modelo User
 * 
 * Genera datos de prueba para usuarios del sistema.
 * Soporta diferentes tipos: usuario, admin, arbitro, capitan.
 * 
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Password cacheado para mejorar rendimiento
     */
    protected static ?string $password;

    /**
     * Define el estado por defecto del modelo
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'tipo' => 'usuario',
            'equipoId' => null,
        ];
    }

    /**
     * Estado: Usuario administrador
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'admin',
        ]);
    }

    /**
     * Estado: Usuario árbitro
     */
    public function arbitro(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'arbitro',
        ]);
    }

    /**
     * Estado: Usuario capitán de equipo
     */
    public function capitan(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'capitan',
        ]);
    }

    /**
     * Estado: Email no verificado
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
