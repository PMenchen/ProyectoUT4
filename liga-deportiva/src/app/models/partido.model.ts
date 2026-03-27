/**
 * Modelo de Partido
 *
 * Define la estructura de un partido deportivo en el sistema.
 * Gestiona la información del encuentro, equipos, resultados y estado actual.
 * Los partidos pueden tener diferentes estados durante su ciclo de vida.
 */
export interface Partido {
  /** ID único del partido (generado por MongoDB) */
  id?: number;
  /** Equipo local (puede ser ID o objeto poblado) */
  equipoLocal: number | { id: number; nombre: string; deporte: string; escudo?: string };
  /** Equipo visitante (puede ser ID o objeto poblado) */
  equipoVisitante: number | { id: number; nombre: string; deporte: string; escudo?: string };
  /** Deporte del partido */
  deporte: string;
  /** Fecha del partido */
  fecha: Date | string;
  /** Hora de inicio del partido */
  hora: string;
  /** Ubicación donde se juega el partido */
  ubicacion: string;
  /** ID del árbitro asignado (puede ser string, objeto poblado o null) */
  arbitroId?: number | { id: number; nombre: string; deporte: string } | null;
  /** Goles/puntos del equipo local */
  golesLocal: number;
  /** Goles/puntos del equipo visitante */
  golesVisitante: number;
  /** Estado actual del partido */
  estado: 'pendiente' | 'en_progreso' | 'finalizado' | 'cancelado';
  /** Número de jornada del partido (opcional) */
  jornada?: number;
  /** Observaciones adicionales sobre el partido (opcional) */
  observaciones?: string;
  /** Fecha de creación del registro */
  createdAt?: Date;
}
