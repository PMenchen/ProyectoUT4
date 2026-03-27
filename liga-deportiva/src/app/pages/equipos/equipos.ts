import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Equipo } from '../../models/equipo.model';

declare const bootstrap: any;

/**
 * Componente de Equipos
 *
 * Componente standalone que muestra y gestiona la visualización de equipos deportivos.
 * Funcionalidades:
 * - Lista todos los equipos organizados por deporte
 * - Filtrado por tipo de deporte
 * - Visualización de estadísticas básicas de cada equipo
 * - Modal con información detallada del equipo seleccionado
 *
 * Los equipos se cargan automáticamente desde el backend al inicializar el componente.
 */
@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos implements OnInit {
  /** Deporte actualmente seleccionado para filtrar */
  selectedCompetition = 'Fútbol';

  /** Equipo seleccionado para mostrar en el modal */
  selectedTeam: any | null = null;

  /** Lista de todos los equipos cargados desde el backend */
  equipos: Equipo[] = [];

  /** Indica si los datos están siendo cargados */
  cargando = true;

  /** Mensaje de error en caso de fallo al cargar datos */
  error = '';

  /** Información de los deportes disponibles */
  competitionsInfo = [
    { id: 'Fútbol', name: 'Fútbol', icon: 'fa-futbol' },
    { id: 'Baloncesto', name: 'Baloncesto', icon: 'fa-basketball' },
    { id: 'Voleibol', name: 'Voleibol', icon: 'fa-volleyball' },
    { id: 'Balonmano', name: 'Balonmano', icon: 'fa-hand-fist' },
  ];

  constructor(private db: Database) {}

  /**
   * Inicializa el componente cargando los equipos desde el backend
   */
  ngOnInit() {
    this.cargarEquipos();
  }

  /**
   * Carga todos los equipos desde el backend
   */
  cargarEquipos() {
    this.cargando = true;
    this.error = '';

    this.db.getEquipos().subscribe({
      next: (equipos) => {
        this.cargando = false;
        this.equipos = equipos;
      },
      error: (error) => {
        this.cargando = false;
        this.error = 'Error al cargar equipos. Asegúrate de que el backend esté corriendo.';
        console.error('Error al cargar equipos:', error);
      }
    });
  }

  /**
   * Cambia el deporte seleccionado para filtrar equipos
   * @param competitionId - ID del deporte a seleccionar
   */
  selectCompetition(competitionId: string) {
    this.selectedCompetition = competitionId;
  }

  /**
   * Obtiene los equipos del deporte actualmente seleccionado
   * Los ordena por puntos y les asigna una posición
   * @returns Array de equipos filtrados y ordenados
   */
  getCurrentTeams(): any[] {
    return this.equipos
      .filter(equipo => equipo.deporte === this.selectedCompetition)
      .sort((a, b) => b.puntos - a.puntos)
      .map((equipo, index) => ({
        ...equipo,
        posicion: index + 1,
        jugadores: Array.isArray(equipo.jugadores) ? equipo.jugadores.length : 0,
        capitan: this.getCapitanNombre(equipo)
      }));
  }

  /**
   * Obtiene el nombre del capitán de un equipo
   * @param equipo - Equipo del cual obtener el capitán
   * @returns Nombre del capitán o 'Sin capitán'
   */
  getCapitanNombre(equipo: Equipo): string {
    if (!equipo.capitanId) return 'Sin capitán';
    if (typeof equipo.capitanId === 'object' && 'nombre' in equipo.capitanId) {
      return equipo.capitanId.nombre;
    }
    return 'Sin capitán';
  }

  /**
   * Abre el modal con la información detallada del equipo
   * @param team - Equipo a mostrar en el modal
   */
  openModal(team: any) {
    this.selectedTeam = team;
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const modalElement = document.getElementById('teamModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  /**
   * Calcula el porcentaje de victorias de un equipo
   * @param team - Equipo del cual calcular el porcentaje
   * @returns Porcentaje de victorias (0-100)
   */
  getWinPercentage(team: any): number {
    const total = team.victorias + team.derrotas + team.empates;
    return total > 0 ? Math.round((team.victorias / total) * 100) : 0;
  }
}
