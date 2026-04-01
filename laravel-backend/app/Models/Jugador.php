<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Jugador
 * 
 * Representa un jugador que pertenece a un equipo.
 */
class Jugador extends Model
{
    use HasFactory;

    /**
     * Campos que se pueden asignar masivamente
     */
    protected $fillable = [
        'nombre',
        'posicion',
        'numero',
        'equipo_id',
        'deporte',
        'estadisticas',
        'foto',
    ];

    /**
     * Nombre de la tabla (en español plural)
     */
    protected $table = 'jugadores';

    /**
     * Casting de atributos
     */
    protected $casts = [
        'estadisticas' => 'array',
    ];

    /**
     * Atributos que deben estar ocultos en arrays
     */
    protected $hidden = [];

    /**
     * Atributos que deben añadirse a las respuestas JSON
     */
    protected $appends = ['equipoId'];

    /**
     * Relación: Un jugador pertenece a un equipo
     */
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    /**
     * Accessor para equipoId (compatibilidad con frontend)
     * Retorna el objeto equipo completo si está cargado, sino el ID
     */
    public function getEquipoIdAttribute()
    {
        if ($this->relationLoaded('equipo') && $this->equipo) {
            return [
                'id' => $this->equipo->id,
                'nombre' => $this->equipo->nombre,
                'deporte' => $this->equipo->deporte,
            ];
        }
        return $this->attributes['equipo_id'] ?? null;
    }
}
