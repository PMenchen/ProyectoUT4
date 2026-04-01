<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para crear la tabla de equipos
 */
return new class extends Migration
{
    /**
     * Ejecutar la migración
     */
    public function up(): void
    {
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('deporte');
            $table->string('ciudad');
            $table->string('categoria'); // Ej: Primera, Segunda, Juvenil
            $table->foreignId('capitan_id')->constrained('users')->onDelete('cascade')->default(null);;
            $table->integer('victorias')->default(0);
            $table->integer('derrotas')->default(0);
            $table->integer('empates')->default(0);
            $table->integer('puntos')->default(0);
            $table->integer('goles_favor')->default(0);
            $table->integer('goles_contra')->default(0);
            $table->string('escudo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Revertir la migración
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
