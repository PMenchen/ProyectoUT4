<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para crear la tabla de partidos
 */
return new class extends Migration
{
    /**
     * Ejecutar la migración
     */
    public function up(): void
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('liga_id')->nullable()->constrained('ligas')->onDelete('cascade');
            $table->foreignId('equipo_local_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('equipo_visitante_id')->constrained('equipos')->onDelete('cascade');
            $table->string('deporte'); // Fútbol, Baloncesto, Voleibol, Balonmano
            $table->date('fecha');
            $table->time('hora');
            $table->string('ubicacion');
            $table->foreignId('arbitro_id')->nullable()->constrained('users')->onDelete('set null');
            $table->integer('goles_local')->default(0);
            $table->integer('goles_visitante')->default(0);
            $table->enum('estado', ['pendiente', 'en_progreso', 'finalizado', 'cancelado'])->default('pendiente');
            $table->integer('jornada')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Revertir la migración
     */
    public function down(): void
    {
        Schema::dropIfExists('partidos');
    }
};
