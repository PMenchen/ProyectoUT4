<?php

namespace Tests\Feature;

use App\Models\Jugador;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JugadorFeatureTest extends TestCase
{
    use RefreshDatabase;   // limpia la BD en cada test

    public function test_endpoint_index_devuelve_json_correcto_y_status_200()
    {
        Jugador::factory()->count(3)->create();

        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Listado de jugadores obtenido correctamente'
                 ])
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => ['id', 'nombre', 'posicion', 'numero', 'equipo_id', 'deporte', 'equipoId']
                     ],
                     'message'
                 ]);
    }

    public function test_endpoint_store_crea_jugador_y_devuelve_201()
    {
        $data = [
            'nombre'    => 'Nuevo Jugador Test',
            'posicion'  => 'Delantero',
            'numero'    => 10,
            'equipo_id' => 1,
            'deporte'   => 'Fútbol',
        ];

        $response = $this->postJson('/api/jugadores', $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Jugador creado correctamente'
                 ]);

        $this->assertDatabaseHas('jugadores', ['nombre' => 'Nuevo Jugador Test']);
    }

    public function test_endpoint_store_falla_con_validacion_incorrecta()
    {
        $response = $this->postJson('/api/jugadores', [
            'nombre' => '',   // nombre requerido
        ]);

        $response->assertStatus(422);
    }
}