import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

/**
 * Guard de Administrador
 *
 * Protege las rutas que solo deben ser accesibles por usuarios con rol de administrador.
 * Si el usuario no tiene el rol necesario, se redirige automáticamente a la página principal.
 *
 * Uso en rutas:
 * { path: 'admin/partidos', component: AdminPartidos, canActivate: [adminGuard] }
 *
 * @returns true si el usuario es admin, false en caso contrario
 */
export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = auth.currentUserValue;

  if (user && user.tipo === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
