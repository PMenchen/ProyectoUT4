import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-clasificaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clasificaciones.html',
  styleUrl: './clasificaciones.css',
})
export class Clasificaciones implements OnInit {
  deporteSeleccionado = 'Fútbol';
  equipos: Equipo[] = [];
  cargando = true;
  error = '';

  deportes = [
    { id: 'Fútbol', nombre: 'Fútbol', icon: 'fa-futbol', color: 'success' },
    { id: 'Baloncesto', nombre: 'Baloncesto', icon: 'fa-basketball', color: 'danger' },
    { id: 'Voleibol', nombre: 'Voleibol', icon: 'fa-volleyball', color: 'primary' },
    { id: 'Balonmano', nombre: 'Balonmano', icon: 'fa-hand-fist', color: 'secondary' },
  ];

  constructor(private db: Database) {}

  ngOnInit() {
    this.cargarEquipos();
  }

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
        this.error = 'Error al cargar clasificaciones. Asegúrate de que el backend esté corriendo.';
        console.error('Error al cargar equipos:', error);
      }
    });
  }

  seleccionarDeporte(deporteId: string) {
    this.deporteSeleccionado = deporteId;
  }

  get clasificacionActual(): any[] {
    const equiposOrdenados = this.equipos
      .filter(equipo => equipo.deporte === this.deporteSeleccionado)
      .sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        const difA = a.golesFavor - a.golesContra;
        const difB = b.golesFavor - b.golesContra;
        if (difB !== difA) return difB - difA;
        return b.golesFavor - a.golesFavor;
      });

    return equiposOrdenados.map((equipo, index) => ({
      ...equipo,
      posicion: index + 1,
      equipo: equipo.nombre,
      partidosJugados: equipo.victorias + equipo.derrotas + equipo.empates
    }));
  }

  getPosicionBadge(posicion: number): string {
    if (posicion === 1) return 'warning';
    if (posicion === 2) return 'secondary';
    if (posicion === 3) return 'info';
    return 'light';
  }

  getPartidosJugados(equipo: any): number {
    return equipo.partidosJugados || (equipo.victorias + equipo.derrotas + equipo.empates);
  }

  getPorcentajeVictorias(equipo: any): number {
    const total = this.getPartidosJugados(equipo);
    return total > 0 ? Math.round((equipo.victorias / total) * 100) : 0;
  }

  getDiferenciaGoles(equipo: Equipo): number {
    return equipo.golesFavor - equipo.golesContra;
  }
}
