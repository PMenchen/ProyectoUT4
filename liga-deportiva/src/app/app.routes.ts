import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Equipos } from './pages/equipos/equipos';
import { Jugadores } from './pages/jugadores/jugadores';
import { Arbitros } from './pages/arbitros/arbitros';
import { Resultados } from './pages/resultados/resultados';
import { Clasificaciones } from './pages/clasificaciones/clasificaciones';
import { Contacto } from './pages/contacto/contacto';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { AdminPartidos } from './pages/admin-partidos/admin-partidos';
import { adminGuard } from './guards/admin.guard';

/**
 * Configuración de Rutas de la Aplicación
 *
 * Define todas las rutas navegables del sistema con sus respectivos componentes.
 * Las rutas están organizadas en:
 *
 * RUTAS PÚBLICAS:
 * - / (Home): Página principal con información general
 * - /equipos: Lista de equipos participantes
 * - /jugadores: Lista de jugadores registrados
 * - /arbitros: Lista de árbitros del sistema
 * - /resultados: Resultados de partidos (requiere autenticación)
 * - /clasificaciones: Clasificaciones por deporte
 * - /contacto: Formulario de contacto
 * - /login: Inicio de sesión
 * - /registro: Registro de nuevos usuarios
 *
 * RUTAS PROTEGIDAS (Solo Admin):
 * - /admin/partidos: Gestión completa de partidos (CRUD)
 *
 * WILDCARD:
 * - ** : Redirige cualquier ruta no encontrada a la página principal
 */
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'equipos', component: Equipos },
  { path: 'jugadores', component: Jugadores },
  { path: 'arbitros', component: Arbitros },
  { path: 'resultados', component: Resultados },
  { path: 'clasificaciones', component: Clasificaciones },
  { path: 'contacto', component: Contacto },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'admin/partidos', component: AdminPartidos, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
