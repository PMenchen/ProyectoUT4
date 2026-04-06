<?php

namespace Tests\Unit;

use App\Models\Jugador;
use Tests\TestCase;

class JugadorTest extends TestCase
{
    public function test_modelo_jugador_puede_crearse_con_datos_validos()
    {
        $jugador = Jugador::factory()->make();

        $this->assertInstanceOf(Jugador::class, $jugador);
        $this->assertNotNull($jugador->nombre);
        $this->assertNotNull($jugador->posicion);
        $this->assertNotNull($jugador->numero);
        $this->assertEquals('jugadores', $jugador->getTable());
    }

    public function test_modelo_tiene_relacion_con_equipo()
    {
        $jugador = new Jugador();
        $this->assertTrue(method_exists($jugador, 'equipo'));
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $jugador->equipo());
    }

    public function test_accessor_equipoId_devuelve_dato_correcto()
    {
        $jugador = Jugador::factory()->make();
        $this->assertArrayHasKey('equipoId', $jugador->toArray());
    }
}