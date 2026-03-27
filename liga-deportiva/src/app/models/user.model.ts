/**
 * Modelo de Usuario
 *
 * Define la estructura de un usuario en el sistema.
 * Los usuarios pueden tener diferentes roles que determinan sus permisos:
 * - admin: Acceso total al sistema, puede gestionar partidos
 * - usuario: Usuario regular, puede ver partidos de su equipo
 * - arbitro: Puede ver y actualizar partidos asignados
 * - capitan: Capitán de equipo con permisos especiales
 */
export interface User {
  /** ID único del usuario (generado por MongoDB) */
  id?: number;
  /** Nombre completo del usuario */
  nombre: string;
  /** Correo electrónico (usado para autenticación) */
  email: string;
  /** Contraseña hasheada */
  password: string;
  /** Tipo de usuario / rol */
  tipo: 'admin' | 'usuario' | 'arbitro' | 'capitan';
  /** ID del equipo al que pertenece (opcional) */
  equipoId?: string;
  /** Fecha de creación del usuario */
  createdAt?: Date;
}

/**
 * Modelo de petición de Login
 * Contiene las credenciales necesarias para autenticación
 */
export interface LoginRequest {
  /** Correo electrónico del usuario */
  email: string;
  /** Contraseña del usuario */
  password: string;
}

/**
 * Modelo de respuesta de Autenticación
 * Respuesta estándar para operaciones de login y registro
 */
export interface AuthResponse {
  /** Indica si la operación fue exitosa */
  success: boolean;
  /** Datos del usuario autenticado */
  user?: User;
  /** Token JWT para autenticación en peticiones futuras */
  token?: string;
  /** Mensaje descriptivo del resultado */
  message?: string;
}
