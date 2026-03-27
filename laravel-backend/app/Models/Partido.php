<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Partido
 * 
 * Representa un partido entre dos equipos dentro de una liga.
 */
class Partido extends Model
{
    use HasFactory;

    /**
     * Campos que se pueden asignar masivamente
     */
    protected $fillable = [
        'liga_id',
        'equipo_visitante_id',
        'equipo_local_id',
        'fecha',
        'resultado',
    ];

    /**
     * Casting de atributos
     */
    protected $casts = [
        'fecha' => 'datetime',
    ];

    /**
     * Relación: Un partido pertenece a una liga
     */
    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    /**
     * Relación: Un partido tiene un equipo local
     */
    public function equipoLocal()
    {
        return $this->belongsTo(Equipo::class, 'equipo_local_id');
    }

    /**
     * Relación: Un partido tiene un equipo visitante
     */
    public function equipoVisitante()
    {
        return $this->belongsTo(Equipo::class, 'equipo_visitante_id');
    }
}
