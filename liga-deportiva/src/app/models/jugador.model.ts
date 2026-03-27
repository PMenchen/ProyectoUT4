/**
 * Modelo de Jugador
 *
 * Define la estructura de un jugador en el sistema.
 * Incluye información personal, estadísticas de juego y relación con su equipo.
 * Las estadísticas se actualizan después de cada partido.
 */
export interface Jugador {
  /** ID único del jugador  */
  id?: number;
  /** Nombre completo del jugador */
  nombre: string;
  /** ID del equipo al que pertenece (puede ser string o objeto poblado) */
  equipoId: number | { id: number; nombre: string; deporte: string };
  /** Deporte que practica el jugador */
  deporte: string;
  /** Número de dorsal del jugador */
  numero?: number;
  /** Posición en la que juega (varía según el deporte) */
  posicion?: string;
  /** Estadísticas generales de los jugadores (varían según el deporte) */
  estadisticas: {
  /** Número total de partidos jugados */
    partidosJugados?: number;
  /** Número total de goles anotados */
    goles?: number;
  /** Número total de asistencias realizadas */
    asistencias?: number;
  /** Número de tarjetas amarillas recibidas */
    tarjetasAmarillas?:number;
  /** Número de tarjetas rojas recibidas */
    tarjetasRojas?:number;
  /** Número total de puntos anotados */
    puntos?: number;
  /** Número total de rebotes realizados */
    rebotes?: number;
  /** Número total de aces anotados */
    aces?: number;
  /** Número total de bloqueos realizados */
    bloqueos?: number;
  };
  /** URL o ruta de la foto del jugador (opcional) */
  foto?: string;
  /** Fecha de creación del registro */
  createdAt?: Date;
}
