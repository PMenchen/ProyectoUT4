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
        'deporte',
        'fecha',
        'hora',
        'ubicacion',
        'arbitro_id',
        'goles_local',
        'goles_visitante',
        'estado',
        'jornada',
        'observaciones',
    ];

    // /**
    //  * Casting de atributos
    //  */
    // protected $casts = [
    //     'fecha' => 'date',
    //     'goles_local' => 'integer',
    //     'goles_visitante' => 'integer',
    // ];

    // /**
    //  * Accessors para compatibilidad con frontend (camelCase)
    //  */
    // protected $appends = ['equipoLocal', 'equipoVisitante', 'arbitroId', 'golesLocal', 'golesVisitante'];

    // public function getEquipoLocalAttribute()
    // {
    //     return $this->relationLoaded('equipoLocalRelacion')
    //         ? $this->equipoLocalRelacion
    //         : $this->equipo_local_id;
    // }

    // public function getEquipoVisitanteAttribute()
    // {
    //     return $this->relationLoaded('equipoVisitanteRelacion')
    //         ? $this->equipoVisitanteRelacion
    //         : $this->equipo_visitante_id;
    // }

    // public function getArbitroIdAttribute()
    // {
    //     return $this->relationLoaded('arbitro') && $this->arbitro
    //         ? [
    //             'id' => $this->arbitro->id,
    //             'nombre' => $this->arbitro->nombre,
    //             'deporte' => $this->deporte,
    //         ]
    //         : $this->arbitro_id;
    // }

    // public function getGolesLocalAttribute()
    // {
    //     return $this->goles_local;
    // }

    // public function getGolesVisitanteAttribute()
    // {
    //     return $this->goles_visitante;
    // }

    // /**
    //  * Relación: Un partido pertenece a una liga
    //  */
    // public function liga()
    // {
    //     return $this->belongsTo(Liga::class);
    // }

    // /**
    //  * Relación: Un partido tiene un equipo local
    //  */
    // public function equipoLocal()
    // {
    //     return $this->belongsTo(Equipo::class, 'equipo_local_id');
    // }

    // /**
    //  * Relación: Un partido tiene un equipo visitante
    //  */
    // public function equipoVisitante()
    // {
    //     return $this->belongsTo(Equipo::class, 'equipo_visitante_id');
    // }

    // /**
    //  * Relación: Un partido tiene un árbitro
    //  */
    // public function arbitro()
    // {
    //     return $this->belongsTo(User::class, 'arbitro_id');
    // }



    // /**
    //  * Casting de atributos
    //  */
    // protected $casts = [
    //     'fecha' => 'date',
    //     'goles_local' => 'integer',
    //     'goles_visitante' => 'integer',
    // ];

    // /**
    //  * Accessors para compatibilidad con frontend (camelCase)
    //  */
    // protected $appends = ['golesLocal', 'golesVisitante'];

    // public function getGolesLocalAttribute()
    // {
    //     return $this->goles_local;
    // }

    // public function getGolesVisitanteAttribute()
    // {
    //     return $this->goles_visitante;
    // }

    // /**
    //  * Relación: Un partido pertenece a una liga
    //  */
    // public function liga()
    // {
    //     return $this->belongsTo(Liga::class);
    // }

    // /**
    //  * Relación: Un partido tiene un equipo local
    //  */
    // public function equipoLocal()
    // {
    //     return $this->belongsTo(Equipo::class, 'equipo_local_id');
    // }

    // /**
    //  * Relación: Un partido tiene un equipo visitante
    //  */
    // public function equipoVisitante()
    // {
    //     return $this->belongsTo(Equipo::class, 'equipo_visitante_id');
    // }

    // /**
    //  * Relación: Un partido tiene un árbitro
    //  */
    // public function arbitro()
    // {
    //     return $this->belongsTo(User::class, 'arbitro_id');
    // }



    /**
     * Casting de atributos
     */
    protected $casts = [
        'fecha' => 'date',
        'goles_local' => 'integer',
        'goles_visitante' => 'integer',
    ];

    /**
     * Accessors para compatibilidad con frontend (camelCase)
     */
    public function getGolesLocalAttribute()
    {
        return $this->attributes['goles_local'] ?? 0;
    }

    public function getGolesVisitanteAttribute()
    {
        return $this->attributes['goles_visitante'] ?? 0;
    }

    /**
     * Sobrescribir toArray para incluir los accessors solo si existen las columnas
     */
    public function toArray()
    {
        $array = parent::toArray();

        // Solo agregar los accessors si las columnas existen
        if (isset($this->attributes['goles_local'])) {
            $array['golesLocal'] = $this->getGolesLocalAttribute();
        }

        if (isset($this->attributes['goles_visitante'])) {
            $array['golesVisitante'] = $this->getGolesVisitanteAttribute();
        }

        return $array;
    }

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

    /**
     * Relación: Un partido tiene un árbitro
     */
    public function arbitro()
    {
        return $this->belongsTo(User::class, 'arbitro_id');
    }

}
