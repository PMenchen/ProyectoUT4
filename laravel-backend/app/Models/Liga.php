<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Liga
 * 
 * Representa una competición/liga deportiva.
 * Una liga tiene muchos partidos asociados.
 */
class Liga extends Model
{
    use HasFactory;

    /**
     * Campos que se pueden asignar masivamente
     */
    protected $fillable = [
        'nombre',
        'deporte',
        'temporada',
    ];

    /**
     * Relación: Una liga tiene muchos partidos
     */
    public function partidos()
    {
        return $this->hasMany(Partido::class);
    }
}
