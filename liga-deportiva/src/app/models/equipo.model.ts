/**
 * Modelo de Equipo
 *
 * Define la estructura de un equipo deportivo en el sistema.
 * Incluye información del equipo, estadísticas y relaciones con jugadores.
 * Los equipos se clasifican por deporte y mantienen su historial de partidos.
 */
export interface Equipo {
  /** ID único del equipo (generado por MongoDB) */
  id?: number;
  /** Nombre del equipo */
  nombre: string;
  /** Deporte que practica el equipo */
  deporte: 'Fútbol' | 'Baloncesto' | 'Voleibol' | 'Balonmano';
  /** Lista de jugadores (IDs o objetos poblados) */
  jugadores: string[] | { id: number; nombre: string }[];
  /** ID del capitán del equipo (puede ser string o objeto poblado) */
  capitanId?: string | { id: number; nombre: string; email: string } | null;
  /** Número de victorias del equipo */
  victorias: number;
  /** Número de derrotas del equipo */
  derrotas: number;
  /** Número de empates del equipo */
  empates: number;
  /** Puntos totales acumulados (3 por victoria, 1 por empate) */
  puntos: number;
  /** Goles anotados por el equipo */
  golesFavor: number;
  /** Goles recibidos por el equipo */
  golesContra: number;
  /** URL o ruta del escudo del equipo (opcional) */
  escudo?: string;
  /** Fecha de creación del equipo */
  createdAt?: Date;
}
