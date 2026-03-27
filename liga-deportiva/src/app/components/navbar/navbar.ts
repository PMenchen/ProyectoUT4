import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Subscription } from 'rxjs';

/**
 * Componente de Barra de Navegación
 *
 * Componente standalone que renderiza la barra de navegación principal de la aplicación.
 * Gestiona:
 * - Links de navegación a todas las secciones públicas
 * - Estado de autenticación del usuario
 * - Visualización condicional de opciones según rol de usuario
 * - Funcionalidad de logout
 * - Acceso a panel de administración (solo para admins)
 *
 * Se suscribe a cambios en el estado de autenticación para actualizar la UI en tiempo real.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  /** Indica si el usuario está autenticado */
  isAuthenticated = false;

  /** Indica si el usuario autenticado tiene rol de administrador */
  isAdmin = false;

  /** Suscripción al observable del usuario actual */
  private authSubscription?: Subscription;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  /**
   * Inicializa el componente suscribiéndose a cambios en el usuario actual
   * Actualiza el estado de autenticación y permisos de administrador
   */
  ngOnInit() {
    this.authSubscription = this.auth.currentUser.subscribe(user => {
      this.isAuthenticated = user !== null;
      this.isAdmin = user?.tipo === 'admin';
    });
  }

  /**
   * Limpia las suscripciones al destruir el componente
   * Previene memory leaks
   */
  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  /**
   * Cierra la sesión del usuario actual
   * Elimina los datos de sesión y redirige a la página principal
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  /**
   * Navega al panel de administración de partidos
   * Solo accesible para usuarios con rol de administrador
   */
  goToAdmin() {
    this.router.navigate(['/admin/partidos']);
  }
}
