import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User, LoginRequest, AuthResponse } from '../models/user.model';

/**
 * Servicio de Autenticación
 *
 * Este servicio maneja toda la lógica de autenticación de la aplicación:
 * - Login y registro de usuarios
 * - Gestión de sesiones mediante tokens JWT
 * - Almacenamiento y recuperación de información del usuario
 * - Control de roles y permisos
 *
 * Utiliza BehaviorSubject para mantener el estado del usuario actual
 * y permitir que los componentes se suscriban a cambios en la autenticación.
 */
@Injectable({
  providedIn: 'root',
})
export class Auth {
  /** URL base del API backend */
  private apiUrl = 'http://localhost:8000/api';

  /** BehaviorSubject que almacena el usuario actual y permite suscripciones */
  private currentUserSubject: BehaviorSubject<User | null>;

  /** Observable público del usuario actual para suscripciones en componentes */
  public currentUser: Observable<User | null>;

  /**
   * Constructor del servicio
   * Inicializa el usuario actual desde localStorage si existe una sesión activa
   */
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Getter para obtener el valor actual del usuario sin necesidad de suscribirse
   * @returns Usuario actual o null si no hay sesión activa
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Inicia sesión de un usuario
   * Realiza una petición POST al backend con las credenciales
   * Si es exitoso, almacena el usuario y token en localStorage
   *
   * @param credentials - Objeto con email y password del usuario
   * @returns Observable con la respuesta de autenticación
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of({ success: false, message: 'Error al iniciar sesión' });
      })
    );
  }

  /**
   * Registra un nuevo usuario en el sistema
   * Realiza una petición POST al backend con los datos del usuario
   * Si es exitoso, automáticamente inicia sesión guardando usuario y token
   *
   * @param user - Datos del usuario a registrar (email, password, nombre, tipo, etc.)
   * @returns Observable con la respuesta de autenticación
   */
  register(user: Partial<User>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user).pipe(
      tap(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Error en registro:', error);
        return of({ success: false, message: 'Error al registrar usuario' });
      })
    );
  }

  /**
   * Cierra la sesión del usuario actual
   * Elimina el usuario y token del localStorage
   * Actualiza el BehaviorSubject a null
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  /**
   * Verifica si hay un usuario autenticado
   * @returns true si existe un usuario en sesión, false en caso contrario
   */
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   * @param role - Rol a verificar ('admin', 'usuario', 'arbitro')
   * @returns true si el usuario tiene el rol especificado
   */
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.tipo === role : false;
  }

  /**
   * Obtiene el token JWT del usuario actual desde localStorage
   * @returns Token JWT o null si no existe
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
