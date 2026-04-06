// database.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipo } from '../models/equipo.model';
import { Jugador } from '../models/jugador.model';
import { Arbitro } from '../models/arbitro.model';
import { Partido } from '../models/partido.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Database {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // ==================== EQUIPOS ====================

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<ApiResponse<Equipo[]>>(`${this.apiUrl}/equipos`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getEquipos'))
      );
  }

  getEquipo(id: number): Observable<Equipo> {
    return this.http.get<ApiResponse<Equipo>>(`${this.apiUrl}/equipos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getEquipo'))
      );
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<ApiResponse<Equipo>>(`${this.apiUrl}/equipos`, equipo, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('createEquipo'))
      );
  }

  updateEquipo(id: number, equipo: Partial<Equipo>): Observable<Equipo> {
    return this.http.put<ApiResponse<Equipo>>(`${this.apiUrl}/equipos/${id}`, equipo, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('updateEquipo'))
      );
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/equipos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deleteEquipo'))
      );
  }

  // ==================== JUGADORES ====================

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<ApiResponse<Jugador[]>>(`${this.apiUrl}/jugadores`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getJugadores'))
      );
  }

  getJugador(id: number): Observable<Jugador> {
    return this.http.get<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getJugador'))
      );
  }

  getJugadoresByEquipo(equipoId: number): Observable<Jugador[]> {
    return this.http.get<ApiResponse<Jugador[]>>(`${this.apiUrl}/equipos/${equipoId}/jugadores`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getJugadoresByEquipo'))
      );
  }

  createJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores`, jugador, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('createJugador'))
      );
  }

  updateJugador(id: number, jugador: Partial<Jugador>): Observable<Jugador> {
    return this.http.put<ApiResponse<Jugador>>(`${this.apiUrl}/jugadores/${id}`, jugador, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('updateJugador'))
      );
  }

  deleteJugador(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/jugadores/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('deleteJugador'))
      );
  }

  // ==================== ARBITROS ====================

  getArbitros(): Observable<Arbitro[]> {
    return this.http.get<ApiResponse<Arbitro[]>>(`${this.apiUrl}/arbitros`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getArbitros'))
      );
  }

  getArbitro(id: number): Observable<Arbitro> {
    return this.http.get<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getArbitro'))
      );
  }

  createArbitro(arbitro: Arbitro): Observable<Arbitro> {
    return this.http.post<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros`, arbitro, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('createArbitro'))
      );
  }

  updateArbitro(id: number, arbitro: Partial<Arbitro>): Observable<Arbitro> {
    return this.http.put<ApiResponse<Arbitro>>(`${this.apiUrl}/arbitros/${id}`, arbitro, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('updateArbitro'))
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

  getPartidos(): Observable<Partido[]> {
    return this.http.get<ApiResponse<Partido[]>>(`${this.apiUrl}/partidos`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getPartidos'))
      );
  }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<ApiResponse<Partido>>(`${this.apiUrl}/partidos/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getPartido'))
      );
  }

  getPartidosByEquipo(equipoId: number): Observable<Partido[]> {
    return this.http.get<ApiResponse<Partido[]>>(`${this.apiUrl}/equipos/${equipoId}/partidos`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError('getPartidosByEquipo'))
      );
  }

  createPartido(partido: Partido): Observable<Partido> {
    return this.http.post<ApiResponse<Partido>>(`${this.apiUrl}/partidos`, partido, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('createPartido'))
      );
  }

  updatePartido(id: number, partido: Partial<Partido>): Observable<Partido> {
    return this.http.put<ApiResponse<Partido>>(`${this.apiUrl}/partidos/${id}`, partido, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(this.handleError('updatePartido'))
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
   * Maneja errores de las peticiones HTTP propagandolos al componente.
   * Esto permite que cada componente decida como manejar el error
   * (mostrar mensaje, redirigir, reintentar, etc.)
   */
  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error(`${operation} fallo:`, error.message);

      // Puedes agregar logica adicional aqui:
      // - Enviar errores a un servicio de logging
      // - Mostrar notificaciones globales
      // - Manejar errores de autenticacion (401/403)

      if (error.status === 401) {
        // Token expirado o no autorizado
        localStorage.removeItem('token');
        // Podrias redirigir al login aqui si inyectas Router
      }

      // Propaga el error para que el componente lo maneje
      return throwError(() => error);
    };
  }
}