import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Jugador } from '../../models/jugador.model';
import { Equipo } from '../../models/equipo.model';

declare const bootstrap: any;

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})

export class Jugadores implements OnInit {
  searchTerm = '';
  selectedJugador: Jugador | null = null;
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  cargando = true;
  error = '';

  constructor(
    private db: Database,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  /**
   * Carga equipos y jugadores de forma independiente.
   * La carga de jugadores controla el estado principal.
   */
  cargarDatos() {
    this.cargando = true;
    this.error = '';

    // Cargar equipos (no bloquea la carga principal)
    this.db.getEquipos().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
      },
      error: (err) => {
        console.error('[v0] getEquipos() - ERROR:', err);
      },
      complete: () => {
        console.log('getEquipos() - COMPLETADO');
      }
    });

    // Cargar jugadores (controla el estado de carga principal)
    this.db.getJugadores().subscribe({
      next: (jugadores) => {
        this.jugadores = jugadores;
        this.cargando = false;
        // Forzar deteccion de cambios para actualizar la vista
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[v0] getJugadores() - ERROR:', err);
        this.error = 'Error al cargar jugadores. Asegurate de que el backend este corriendo en http://localhost:8000';
        this.cargando = false;
        // Forzar deteccion de cambios para mostrar el error
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('getJugadores() - COMPLETADO');
      }
    });
  }

  get filteredJugadores(): Jugador[] {
    if (!this.searchTerm) {
      return this.jugadores;
    }

    const term = this.searchTerm.toLowerCase();

    return this.jugadores.filter((jugador) => {
      const equipo = this.getNombreEquipo(jugador).toLowerCase();
      return (
        jugador.nombre.toLowerCase().includes(term) ||
        equipo.includes(term) ||
        jugador.deporte.toLowerCase().includes(term) ||
        (jugador.posicion?.toLowerCase().includes(term) ?? false)
      );
    });
  }

  openModal(jugador: Jugador) {
    this.selectedJugador = jugador;
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const modalElement = document.getElementById('jugadorModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  getDeporteIcon(deporte: string): string {
    const icons: Record<string, string> = {
      'Fútbol': 'fa-futbol',
      'Baloncesto': 'fa-basketball',
      'Voleibol': 'fa-volleyball',
      'Balonmano': 'fa-hand-fist',
    };
    return icons[deporte] || 'fa-user';
  }

  getNombreEquipo(jugador: Jugador): string {
    if (!jugador.equipoId) return 'Sin equipo';

    if (typeof jugador.equipoId === 'number') {
      const equipo = this.equipos?.find(e => e.id === jugador.equipoId);
      return equipo?.nombre || 'Sin equipo';
    }

    return jugador.equipoId.nombre;
  }

  getEstadisticasDisplay(jugador: Jugador): string[] {
    const stats: string[] = [];
    const e = jugador.estadisticas || {};

    if (e.partidosJugados !== undefined) {
      stats.push(`${e.partidosJugados} Partidos`);
    }

    if (e.goles) {
      stats.push(`${e.goles} Goles`);
    }
    if (e.asistencias) {
      stats.push(`${e.asistencias} Asistencias`);
    }
    if (e.tarjetasAmarillas) {
      stats.push(`${e.tarjetasAmarillas} T. Amarillas`);
    }
    if (e.tarjetasRojas) {
      stats.push(`${e.tarjetasRojas} T. Rojas`);
    }
    if (e.puntos) {
      stats.push(`${e.puntos} Puntos`);
    }
    if (e.rebotes) {
      stats.push(`${e.rebotes} Rebotes`);
    }
    if (e.aces) {
      stats.push(`${e.aces} Aces`);
    }
    if (e.bloqueos) {
      stats.push(`${e.bloqueos} Bloqueos`);
    }
    return stats;
  }
}
