/**
 * Modelo de Árbitro
 *
 * Define la estructura de un árbitro en el sistema.
 * Los árbitros se asignan a partidos y mantienen un registro de su experiencia.
 * Incluye estadísticas de las acciones tomadas durante los partidos.
 */
export interface Arbitro {
  /** ID único del árbitro */
  id?: number;
  /** Nombre completo del árbitro */
  nombre: string;
  /** Deporte en el que arbitra */
  deporte: string;
  /** Nivel de experiencia (ej: "Nacional", "Internacional", "Amateur") */
  experiencia: string;
  /** Número total de partidos arbitrados */
  partidosArbitrados: number;
  /** URL o ruta de la imagen del árbitro (opcional) */
  imagen?: string;
  /** Estadísticas de acciones del árbitro */
  estadisticas: {
    /** Total de tarjetas amarillas mostradas */
    tarjetasAmarillas?: number;
    /** Total de tarjetas rojas mostradas */
    tarjetasRojas?: number;
    /** Total de faltas técnicas señaladas */
    faltasTecnicas?: number;
    /** Total de penaltis pitados */
    penaltis?: number;
  };
}
