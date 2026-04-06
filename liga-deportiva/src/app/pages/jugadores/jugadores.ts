import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
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

export class Jugadores implements OnInit, OnDestroy {
  searchTerm = '';
  selectedJugador: Jugador | null = null;
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  cargando = true;
  error = '';

  private subscription: Subscription | null = null;

  constructor(private db: Database) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ngOnDestroy() {
    // Cancelar suscripcion si el componente se destruye antes de completar
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Carga equipos y jugadores en paralelo usando forkJoin.
   * Incluye timeout de 15 segundos para evitar esperas infinitas.
   */
  cargarDatos() {
    this.cargando = true;
    this.error = '';
    this.jugadores = [];
    this.equipos = [];

    // Cancelar peticion anterior si existe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Usar forkJoin para ejecutar ambas peticiones en paralelo
    // y esperar a que AMBAS terminen (o fallen)
    this.subscription = forkJoin({
      equipos: this.db.getEquipos().pipe(
        timeout(15000), // 15 segundos de timeout
        catchError(err => {
          console.error('Error al cargar equipos:', err);
          return of([] as Equipo[]); // Retornar array vacio si falla
        })
      ),
      jugadores: this.db.getJugadores().pipe(
        timeout(15000), // 15 segundos de timeout
        catchError(err => {
          console.error('Error al cargar jugadores:', err);
          this.error = 'Error al cargar jugadores. Asegurate de que el backend este corriendo en http://localhost:8000';
          return of([] as Jugador[]); // Retornar array vacio si falla
        })
      )
    }).subscribe({
      next: (result) => {
        this.equipos = result.equipos;
        this.jugadores = result.jugadores;
        this.cargando = false;
      },
      error: (err) => {
        // Este bloque se ejecuta si hay un error no capturado
        console.error('Error inesperado:', err);
        this.error = 'Error inesperado al cargar datos.';
        this.cargando = false;
      },
      complete: () => {
        // Asegurar que cargando se pone en false cuando se completa
        this.cargando = false;
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

  // getNombreEquipo(jugador: Jugador): string {
  //   if (jugador.equipoId && typeof jugador.equipoId === 'object' && 'nombre' in jugador.equipoId) {
  //     return jugador.equipoId.nombre;
  //   }
  //   return 'Sin equipo';
  // }

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
