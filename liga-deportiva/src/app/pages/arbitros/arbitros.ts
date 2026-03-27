import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';
import { Arbitro } from '../../models/arbitro.model';

declare const bootstrap: any;

@Component({
  selector: 'app-arbitros',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './arbitros.html',
  styleUrl: './arbitros.css',
})
export class Arbitros implements OnInit {
  searchTerm = '';
  selectedArbitro: Arbitro | null = null;
  arbitros: Arbitro[] = [];
  cargando = true;
  error = '';

  constructor(private db: Database) {}

  ngOnInit() {
    this.cargarArbitros();
  }

  cargarArbitros() {
    this.cargando = true;
    this.error = '';

    this.db.getArbitros().subscribe({
      next: (arbitros) => {
        this.cargando = false;
        this.arbitros = arbitros;
      },
      error: (error) => {
        this.cargando = false;
        this.error = 'Error al cargar árbitros. Asegúrate de que el backend esté corriendo.';
        console.error('Error al cargar árbitros:', error);
      }
    });
  }

  get filteredArbitros(): Arbitro[] {
    if (!this.searchTerm) {
      return this.arbitros;
    }
    const term = this.searchTerm.toLowerCase();
    return this.arbitros.filter(
      (arbitro) =>
        arbitro.nombre.toLowerCase().includes(term) ||
        arbitro.deporte.toLowerCase().includes(term)
    );
  }

  openModal(arbitro: Arbitro) {
    this.selectedArbitro = arbitro;
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const modalElement = document.getElementById('arbitroModal');
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
    return icons[deporte] || 'fa-whistle';
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
}
