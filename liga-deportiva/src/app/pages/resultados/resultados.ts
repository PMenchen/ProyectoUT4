import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Auth } from '../../services/auth';
import { Partido } from '../../models/partido.model';
import { Equipo } from '../../models/equipo.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  equiposMap: Record<number, Equipo> = {};

  private destroy$ = new Subject<void>();

  constructor(
    private db: Database,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.cargarEquipos();
    this.cargarPartidos();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPartidos() {
    this.cargando = true;
    this.error = '';
    this.partidos = [];


    this.db.getPartidos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (partidos: Partido[]) => {
        console.log(partidos);
        this.partidos = partidos.filter((p: Partido) => p.estado === 'finalizado');
        // this.partidos = partidos;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.error = 'Error al cargar partidos. Asegúrate de que el backend esté corriendo.';
        console.error('Error al cargar partidos:', error);
      }
    });
  }

  cargarEquipos() {
    this.db.getEquipos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (equipos: Equipo[]) => {
          this.equiposMap = equipos.reduce((acc, eq) => {
            if (eq.id !== undefined) {
              acc[eq.id] = eq;
            }
            return acc;
          }, {} as Record<number, Equipo>);
        },
        error: (err: any) => {
          console.error('Error al cargar equipos', err);
        }
      });
}

  // getNombreEquipo(equipo: any): string {
  //   console.log(equipo)
  //   if (typeof equipo === 'object' && equipo !== null && 'nombre' in equipo) {
  //     return equipo.nombre;
  //   }
  //   return 'Equipo';
  // }

  getNombreEquipo(equipo: number | any): string {
    // 🔹 Si ya es objeto
    if (typeof equipo === 'object' && equipo !== null && 'nombre' in equipo) {
      return equipo.nombre;
    }

    // 🔹 Si es ID
    if (typeof equipo === 'number') {
      return this.equiposMap[equipo]?.nombre ?? 'Equipo';
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
