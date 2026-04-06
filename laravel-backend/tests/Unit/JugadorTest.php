<?php

namespace Tests\Unit;

use App\Models\Jugador;
use App\Models\Equipo;
use Tests\TestCase;

/**
 * Tests Unitarios del Modelo Jugador
 * 
 * Prueba la lógica de negocio del modelo Jugador sin interacción con la base de datos.
 * Se utilizan mocks y factories para simular datos.
 */
class JugadorTest extends TestCase
{
    /**
     * Test: El modelo Jugador se puede crear con datos válidos usando factory
     */
    public function test_modelo_jugador_puede_crearse_con_datos_validos()
    {
        $jugador = Jugador::factory()->make();

        $this->assertInstanceOf(Jugador::class, $jugador);
        $this->assertNotNull($jugador->nombre);
        $this->assertNotNull($jugador->posicion);
        $this->assertNotNull($jugador->numero);
        $this->assertEquals('jugadores', $jugador->getTable());
    }

    /**
     * Test: El modelo tiene la relación belongsTo con Equipo definida
     */
    public function test_modelo_tiene_relacion_con_equipo()
    {
        $jugador = new Jugador();
        $this->assertTrue(method_exists($jugador, 'equipo'));
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $jugador->equipo());
    }

    /**
     * Test: El accessor equipoId está presente en el array serializado
     */
    public function test_accessor_equipoId_devuelve_dato_correcto()
    {
        $jugador = Jugador::factory()->make();
        $this->assertArrayHasKey('equipoId', $jugador->toArray());
    }

    /**
     * Test: Los campos fillable están correctamente definidos
     */
    public function test_campos_fillable_estan_definidos()
    {
        $jugador = new Jugador();
        $fillable = $jugador->getFillable();

        $this->assertContains('nombre', $fillable);
        $this->assertContains('posicion', $fillable);
        $this->assertContains('numero', $fillable);
        $this->assertContains('equipo_id', $fillable);
        $this->assertContains('deporte', $fillable);
        $this->assertContains('estadisticas', $fillable);
    }

    /**
     * Test: El campo estadisticas se castea correctamente a array
     */
    public function test_estadisticas_se_castea_a_array()
    {
        $jugador = Jugador::factory()->make([
            'estadisticas' => ['goles' => 10, 'partidos' => 20]
        ]);

        $this->assertIsArray($jugador->estadisticas);
        $this->assertEquals(10, $jugador->estadisticas['goles']);
        $this->assertEquals(20, $jugador->estadisticas['partidos']);
    }

    /**
     * Test: El número de jugador debe estar en rango válido (factory)
     */
    public function test_numero_jugador_en_rango_valido()
    {
        $jugador = Jugador::factory()->make();
        
        $this->assertGreaterThanOrEqual(1, $jugador->numero);
        $this->assertLessThanOrEqual(99, $jugador->numero);
    }

    /**
     * Test: La posición es una de las válidas definidas en factory
     */
    public function test_posicion_es_valida()
    {
        $posicionesValidas = ['Delantero', 'Defensa', 'Portero', 'Centrocampista'];
        $jugador = Jugador::factory()->make();
        
        $this->assertContains($jugador->posicion, $posicionesValidas);
    }

    /**
     * Test: El modelo puede ser convertido a JSON correctamente
     */
    public function test_modelo_puede_convertirse_a_json()
    {
        $jugador = Jugador::factory()->make([
            'nombre' => 'Test Player',
            'posicion' => 'Delantero',
            'numero' => 10
        ]);

        $json = $jugador->toJson();
        $decoded = json_decode($json, true);

        $this->assertJson($json);
        $this->assertEquals('Test Player', $decoded['nombre']);
        $this->assertEquals('Delantero', $decoded['posicion']);
        $this->assertEquals(10, $decoded['numero']);
    }
}
