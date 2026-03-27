import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipo } from '../models/equipo.model';
import { Jugador } from '../models/jugador.model';
import { Arbitro } from '../models/arbitro.model';
import { Partido } from '../models/partido.model';

/**
 * Interfaz para las respuestas del API
 * Todas las respuestas del backend siguen este formato estandarizado
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Servicio de Base de Datos
 *
 * Este servicio centraliza todas las operaciones CRUD con el backend:
 * - Equipos: Gestión completa de equipos deportivos
 * - Jugadores: Gestión de jugadores y sus estadísticas
 * - Árbitros: Gestión de árbitros asignados a partidos
 * - Partidos: Gestión de partidos y resultados
 *
 * Implementa operaciones HTTP (GET, POST, PUT, DELETE) con:
 * - Autenticación mediante tokens JWT en headers
 * - Manejo centralizado de errores
 * - Transformación de respuestas del API
 * - Tipado fuerte con TypeScript
 */
@Injectable({
  providedIn: 'root',
})
export class Database {
  /** URL base del API backend */
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Construye los headers HTTP necesarios para las peticiones
   * Incluye el token JWT si existe una sesión activa
   *
   * @returns HttpHeaders con Content-Type y Authorization
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // ==================== EQUIPOS ====================

  /**
   * Obtiene todos los equipos de la base de datos
   * @returns Observable con array de equipos
   */
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<ApiResponse<Equipo[]>>(`${this.apiUrl}/equipos`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Equipo[]>('getEquipos', []))
      );
  }

  /**
   * Obtiene un equipo específico por su ID
   * @param id - ID del equipo
   * @returns Observable con los datos del equipo
   */
  getEquipo(id: number): Observable<Equipo> {
    return this.http.get<ApiResponse<Equipo>>(`${this.apiUrl}/equipos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Equipo>('getEquipo'))
      );
  }

  /**
   * Crea un nuevo equipo en la base de datos
   * @param equipo - Datos del equipo a crear
   * @returns Observable con el equipo creado
   */
  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<ApiResponse<Equipo>>(`${this.apiUrl}/equipos`, equipo, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Equipo>('createEquipo'))
      );
  }

  /**
   * Actualiza un equipo existente
   * @param id - ID del equipo a actualizar
   * @param equipo - Datos parciales del equipo a actualizar
   * @returns Observable con el equipo actualizado
   */
  updateEquipo(id: number, equipo: Partial<Equipo>): Observable<Equipo> {
    return this.http.put<ApiResponse<Equipo>>(`${this.apiUrl}/equipos/${id}`, equipo, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Equipo>('updateEquipo'))
      );
  }

  /**
   * Elimina un equipo de la base de datos
   * @param id - ID del equipo a eliminar
   * @returns Observable con confirmación de eliminación
   */
  deleteEquipo(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/equipos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deleteEquipo'))
      );
  }

  // ==================== JUGADORES ====================

  /**
   * Obtiene todos los jugadores de la base de datos
   * @returns Observable con array de jugadores
   */
  getJugadores(): Observable<Jugador[]> {
    return this.http.get<ApiResponse<Jugador[]>>(`${this.apiUrl}/jugadores`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError<Jugador[]>('getJugadores', []))
      );
  }

  // getJugadores(): Observable<Jugador[]> {
  //   return this.http.get<any>(`${this.apiUrl}/jugadores`, { headers: this.getHeaders() })
  //   .pipe(
  //     map(response => {
  //       console.log('Respuesta real:', response.data);
  //       return response.data || response; 
  //     }),
  //     catchError(this.handleError<Jugador[]>('getJugadores', []))
  //   );
  // }


  getJugador(id: number): Observable<Jugador> {
    return this.http.get<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Jugador>('getJugador'))
      );
  }

  createJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores`, jugador, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Jugador>('createJugador'))
      );
  }

  updateJugador(id: number, jugador: Partial<Jugador>): Observable<Jugador> {
    return this.http.put<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores/${id}`, jugador, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Jugador>('updateJugador'))
      );
  }

  deleteJugador(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/jugadores/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deleteJugador'))
      );
  }

  // ==================== ÁRBITROS ====================

  /**
   * Obtiene todos los árbitros de la base de datos
   * @returns Observable con array de árbitros
   */
  getArbitros(): Observable<Arbitro[]> {
    return this.http.get<ApiResponse<Arbitro[]>>(`${this.apiUrl}/arbitros`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Arbitro[]>('getArbitros', []))
      );
  }

  getArbitro(id: number): Observable<Arbitro> {
    return this.http.get<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Arbitro>('getArbitro'))
      );
  }

  createArbitro(arbitro: Arbitro): Observable<Arbitro> {
    return this.http.post<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros`, arbitro, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Arbitro>('createArbitro'))
      );
  }

  updateArbitro(id: number, arbitro: Partial<Arbitro>): Observable<Arbitro> {
    return this.http.put<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros/${id}`, arbitro, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Arbitro>('updateArbitro'))
      );
  }

  deleteArbitro(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/arbitros/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deleteArbitro'))
      );
  }

  // ==================== PARTIDOS ====================

  /**
   * Obtiene todos los partidos de la base de datos
   * @returns Observable con array de partidos
   */
  getPartidos(): Observable<Partido[]> {
    return this.http.get<ApiResponse<Partido[]>>(`${this.apiUrl}/partidos`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Partido[]>('getPartidos', []))
      );
  }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<ApiResponse<Partido>>(`${this.apiUrl}/partidos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Partido>('getPartido'))
      );
  }

  /**
   * Obtiene todos los partidos asignados a un árbitro específico
   * @param arbitroId - ID del árbitro
   * @returns Observable con array de partidos del árbitro
   */
  getPartidosByArbitro(arbitroId: number): Observable<Partido[]> {
    return this.http.get<ApiResponse<Partido[]>>(`${this.apiUrl}/partidos/arbitro/${arbitroId}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Partido[]>('getPartidosByArbitro', []))
      );
  }

  /**
   * Obtiene todos los partidos de un equipo específico
   * @param equipoId - ID del equipo
   * @returns Observable con array de partidos del equipo
   */
  getPartidosByEquipo(equipoId: number): Observable<Partido[]> {
    return this.http.get<ApiResponse<Partido[]>>(`${this.apiUrl}/partidos/equipo/${equipoId}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Partido[]>('getPartidosByEquipo', []))
      );
  }

  createPartido(partido: Partido): Observable<Partido> {
    return this.http.post<ApiResponse<Partido>>(`${this.apiUrl}/partidos`, partido, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Partido>('createPartido'))
      );
  }

  updatePartido(id: number, partido: Partial<Partido>): Observable<Partido> {
    return this.http.put<ApiResponse<Partido>>(`${this.apiUrl}/partidos/${id}`, partido, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Partido>('updatePartido'))
      );
  }

  deletePartido(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/partidos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deletePartido'))
      );
  }

  // ==================== MANEJO DE ERRORES ====================

  /**
   * Maneja errores de las peticiones HTTP de forma centralizada
   * Registra el error en consola y devuelve un resultado por defecto
   *
   * @param operation - Nombre de la operación que falló
   * @param result - Valor por defecto a retornar en caso de error
   * @returns Función que maneja el error y devuelve un Observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falló:`, error);
      return of(result as T);
    };
  }
}
