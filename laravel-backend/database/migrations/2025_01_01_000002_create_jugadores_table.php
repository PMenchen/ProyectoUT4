<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para crear la tabla de jugadores
 */
return new class extends Migration
{
    /**
     * Ejecutar la migración
     */
    public function up(): void
    {
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('posicion'); // Ej: Portero, Defensa, Centrocampista, Delantero
            $table->integer('dorsal');
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Revertir la migración
     */
    public function down(): void
    {
        Schema::dropIfExists('jugadores');
    }
};
