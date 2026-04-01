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
        'deporte',
        'ciudad',
        'categoria',
        'capitan_id',
        'victorias',
        'derrotas',
        'empates',
        'puntos',
        'goles_favor',
        'goles_contra',
        'escudo',
    ];

    /**
     * Atributos que deben añadirse a las respuestas JSON
     */
    protected $appends = ['capitanId', 'golesFavor', 'golesContra'];

    /**
     * Relación: Un equipo tiene muchos jugadores
     */
    public function jugadores()
    {
        return $this->hasMany(Jugador::class, 'equipo_id');
    }

    /**
     * Relación: Un equipo tiene un capitán
     */
    public function capitan()
    {
        return $this->belongsTo(User::class, 'capitan_id');
    }

    /**
     * Accessor para capitanId (compatibilidad con frontend)
     */
    public function getCapitanIdAttribute()
    {
        if ($this->relationLoaded('capitan') && $this->capitan) {
            return [
                'id' => $this->capitan->id,
                'nombre' => $this->capitan->nombre,
                'email' => $this->capitan->email,
            ];
        }
        return $this->attributes['capitan_id'] ?? null;
    }

    /**
     * Accessor para golesFavor (compatibilidad con frontend)
     */
    public function getGolesFavorAttribute()
    {
        return $this->attributes['goles_favor'] ?? 0;
    }

    /**
     * Accessor para golesContra (compatibilidad con frontend)
     */
    public function getGolesContraAttribute()
    {
        return $this->attributes['goles_contra'] ?? 0;
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
