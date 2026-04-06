<?php

namespace Tests\Feature;

use App\Models\Jugador;
use App\Models\Equipo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

/**
 * Tests de Integración (Feature) para el endpoint /api/jugadores
 * 
 * Verifica el comportamiento real del endpoint con la base de datos,
 * validando respuestas JSON, códigos de estado y estructura de datos.
 */
class JugadorFeatureTest extends TestCase
{
    use RefreshDatabase;   // limpia la BD en cada test

    /**
     * Crea un usuario admin para los tests
     */
    protected function createAdmin(): User
    {
        return User::factory()->create(['tipo' => 'admin']);
    }

    /**
     * Configuración inicial para cada test
     */
    protected function setUp(): void
    {
        parent::setUp();
        
        // Crear usuario capitán primero (requerido por la FK del equipo)
        $capitan = User::factory()->create(['tipo' => 'capitan']);
        
        // Crear un equipo por defecto para las pruebas
        Equipo::factory()->create([
            'id' => 1, 
            'nombre' => 'Equipo Test', 
            'deporte' => 'Fútbol',
            'capitan_id' => $capitan->id
        ]);
    }

    /**
     * Test: GET /api/jugadores devuelve JSON correcto con status 200
     */
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

    /**
     * Test: GET /api/jugadores devuelve array vacío si no hay jugadores
     */
    public function test_endpoint_index_devuelve_array_vacio_sin_jugadores()
    {
        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => []
                 ]);
    }

    /**
     * Test: GET /api/jugadores/{id} devuelve un jugador específico
     */
    public function test_endpoint_show_devuelve_jugador_especifico()
    {
        $jugador = Jugador::factory()->create([
            'nombre' => 'Jugador Específico',
            'posicion' => 'Portero'
        ]);

        $response = $this->getJson("/api/jugadores/{$jugador->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'nombre' => 'Jugador Específico',
                         'posicion' => 'Portero'
                     ]
                 ]);
    }

    /**
     * Test: GET /api/jugadores/{id} devuelve 404 si no existe
     */
    public function test_endpoint_show_devuelve_404_si_no_existe()
    {
        $response = $this->getJson('/api/jugadores/9999');

        $response->assertStatus(404)
                 ->assertJson([
                     'success' => false,
                     'message' => 'Jugador no encontrado'
                 ]);
    }

    /**
     * Test: POST /api/jugadores requiere autenticación de admin
     */
    public function test_endpoint_store_requiere_autenticacion()
    {
        $data = [
            'nombre'    => 'Nuevo Jugador Test',
            'posicion'  => 'Delantero',
            'numero'    => 10,
            'equipo_id' => 1,
            'deporte'   => 'Fútbol',
        ];

        $response = $this->postJson('/api/jugadores', $data);

        // Sin autenticación debe devolver 401
        $response->assertStatus(401);
    }

    /**
     * Test: POST /api/jugadores crea jugador con admin autenticado
     */
    public function test_endpoint_store_crea_jugador_con_admin()
    {
        // Crear usuario admin
        $admin = $this->createAdmin();

        $data = [
            'nombre'    => 'Nuevo Jugador Test',
            'posicion'  => 'Delantero',
            'numero'    => 10,
            'equipo_id' => 1,
            'deporte'   => 'Fútbol',
        ];

        $response = $this->actingAs($admin, 'sanctum')
                         ->postJson('/api/jugadores', $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Jugador creado correctamente'
                 ]);

        $this->assertDatabaseHas('jugadores', ['nombre' => 'Nuevo Jugador Test']);
    }

    /**
     * Test: POST /api/jugadores falla con validación incorrecta
     */
    public function test_endpoint_store_falla_con_validacion_incorrecta()
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin, 'sanctum')
                         ->postJson('/api/jugadores', [
                             'nombre' => '',   // nombre requerido
                         ]);

        $response->assertStatus(422);
    }

    /**
     * Test: PUT /api/jugadores/{id} actualiza jugador existente
     */
    public function test_endpoint_update_actualiza_jugador()
    {
        $admin = $this->createAdmin();
        $jugador = Jugador::factory()->create(['nombre' => 'Nombre Original']);

        $response = $this->actingAs($admin, 'sanctum')
                         ->putJson("/api/jugadores/{$jugador->id}", [
                             'nombre' => 'Nombre Actualizado'
                         ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'nombre' => 'Nombre Actualizado'
                     ]
                 ]);

        $this->assertDatabaseHas('jugadores', ['nombre' => 'Nombre Actualizado']);
    }

    /**
     * Test: DELETE /api/jugadores/{id} elimina jugador
     */
    public function test_endpoint_destroy_elimina_jugador()
    {
        $admin = $this->createAdmin();
        $jugador = Jugador::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
                         ->deleteJson("/api/jugadores/{$jugador->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Jugador eliminado correctamente'
                 ]);

        $this->assertDatabaseMissing('jugadores', ['id' => $jugador->id]);
    }

    /**
     * Test: GET /api/equipos/{equipoId}/jugadores devuelve jugadores del equipo
     */
    public function test_endpoint_por_equipo_devuelve_jugadores_filtrados()
    {
        $equipo2 = Equipo::factory()->create(['id' => 2, 'nombre' => 'Otro Equipo']);
        
        Jugador::factory()->count(2)->create(['equipo_id' => 1]);
        Jugador::factory()->count(3)->create(['equipo_id' => 2]);

        $response = $this->getJson('/api/equipos/1/jugadores');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    /**
     * Test: Simulación de llamada HTTP con Http::fake()
     * Demuestra el uso de mocks para simular respuestas externas
     */
    public function test_simulacion_http_fake_ejemplo()
    {
        // Simular respuesta de API externa
        Http::fake([
            'api.externa.com/*' => Http::response([
                'jugadores' => [
                    ['nombre' => 'Jugador Mock 1'],
                    ['nombre' => 'Jugador Mock 2']
                ]
            ], 200)
        ]);

        // Este test demuestra cómo usar Http::fake() para simular APIs externas
        $response = Http::get('https://api.externa.com/jugadores');
        
        $this->assertEquals(200, $response->status());
        $this->assertCount(2, $response->json('jugadores'));
    }
}
