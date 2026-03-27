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
        'dorsal',
        'equipo_id',
    ];

    /**
     * Nombre de la tabla (en español plural)
     */
    protected $table = 'jugadores';

    /**
     * Relación: Un jugador pertenece a un equipo
     */
    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
}
