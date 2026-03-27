<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Equipo
 * 
 * Representa un equipo deportivo en la liga.
 * Un equipo tiene muchos jugadores asociados.
 */
class Equipo extends Model
{
    use HasFactory;

    /**
     * Campos que se pueden asignar masivamente
     */
    protected $fillable = [
        'nombre',
        'ciudad',
        'categoria',
    ];

    /**
     * Relación: Un equipo tiene muchos jugadores
     */
    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    /**
     * Relación: Partidos donde el equipo juega como local
     */
    public function partidosLocal()
    {
        return $this->hasMany(Partido::class, 'equipo_local_id');
    }

    /**
     * Relación: Partidos donde el equipo juega como visitante
     */
    public function partidosVisitante()
    {
        return $this->hasMany(Partido::class, 'equipo_visitante_id');
    }
}
