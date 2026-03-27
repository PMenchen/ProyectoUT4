import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Auth } from '../../services/auth';
import { Partido } from '../../models/partido.model';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {
  partidos: any[] = [];
  cargando = true;
  error = '';

  constructor(
    private db: Database,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.cargarPartidos();
  }

  cargarPartidos() {
    this.cargando = true;
    this.error = '';

    if (!this.auth.isAuthenticated()) {
      this.error = 'Debes iniciar sesión para ver los partidos';
      this.cargando = false;
      return;
    }

    this.db.getPartidos().subscribe({
      next: (response: any) => {
        this.cargando = false;
        this.partidos = (response.data || response).filter((p: Partido) => p.estado === 'finalizado');
      },
      error: (error) => {
        this.cargando = false;
        this.error = 'Error al cargar partidos. Asegúrate de que el backend esté corriendo.';
        console.error('Error al cargar partidos:', error);
      }
    });
  }

  getNombreEquipo(equipo: any): string {
    if (typeof equipo === 'object' && equipo !== null && 'nombre' in equipo) {
      return equipo.nombre;
    }
    return 'Equipo';
  }

  formatearFecha(fecha: string | Date): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  getDeporteIcon(deporte: string): string {
    const icons: Record<string, string> = {
      'Fútbol': 'fa-futbol',
      'Baloncesto': 'fa-basketball',
      'Voleibol': 'fa-volleyball',
      'Balonmano': 'fa-hand-fist',
    };
    return icons[deporte] || 'fa-trophy';
  }

  getDeporteBadgeColor(deporte: string): string {
    const colors: Record<string, string> = {
      'Fútbol': 'success',
      'Baloncesto': 'danger',
      'Voleibol': 'primary',
      'Balonmano': 'secondary',
    };
    return colors[deporte] || 'info';
  }

  getResultadoBadge(partido: Partido, esLocal: boolean): string {
    if (partido.golesLocal > partido.golesVisitante) {
      return esLocal ? 'success' : 'danger';
    } else if (partido.golesLocal < partido.golesVisitante) {
      return esLocal ? 'danger' : 'success';
    }
    return 'secondary';
  }
}
