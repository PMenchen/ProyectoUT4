import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Database } from '../../services/database';
import { Auth } from '../../services/auth';
import { Partido } from '../../models/partido.model';
import { Equipo } from '../../models/equipo.model';
import { Arbitro } from '../../models/arbitro.model';

/**
 * Componente de Administración de Partidos
 *
 * Panel de control exclusivo para administradores que permite la gestión completa de partidos.
 * Funcionalidades principales:
 *
 * - CREAR: Añadir nuevos partidos con todos sus datos (equipos, fecha, árbitro, etc.)
 * - LEER: Visualizar lista completa de partidos con información detallada
 * - ACTUALIZAR: Editar partidos existentes incluyendo resultados y estado
 * - ELIMINAR: Borrar partidos del sistema
 *
 * El componente carga automáticamente:
 * - Lista de equipos disponibles para asignar
 * - Lista de árbitros disponibles para asignar
 * - Todos los partidos registrados ordenados por fecha
 *
 * Protección:
 * - Solo accesible por usuarios con rol 'admin'
 * - Verifica permisos en ngOnInit
 * - Redirige a home si el usuario no tiene permisos
 */
@Component({
  selector: 'app-admin-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-partidos.html',
  styleUrl: './admin-partidos.css',
})
export class AdminPartidos implements OnInit {
  partidos: Partido[] = [];
  equipos: Equipo[] = [];
  arbitros: Arbitro[] = [];
  mostrarFormulario = false;
  editando = false;

  partidoForm: Partial<Partido> = {
    equipoLocal: 0,
    equipoVisitante: 0,
    deporte: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    arbitroId: null,
    golesLocal: 0,
    golesVisitante: 0,
    estado: 'pendiente',
    jornada: 1,
    observaciones: ''
  };

  deportes = ['Fútbol', 'Baloncesto', 'Voleibol', 'Balonmano', 'Tenis'];
  estados = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'finalizado', label: 'Finalizado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  constructor(
    private db: Database,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {

    if (!this.auth.hasRole('admin')) {
      console.log('AdminPartidos - Usuario no es admin, redirigiendo');
      this.router.navigate(['/']);
      return;
    }
    this.cargarDatos();
  }

  cargarDatos() {
    this.db.getPartidos().subscribe(data => {
      this.partidos = data.sort((a, b) =>
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    });

    this.db.getEquipos().subscribe(data => {
      this.equipos = data;
    });

    this.db.getArbitros().subscribe(data => {
      this.arbitros = data;
    });
  }

  nuevoPartido() {
    this.editando = false;
    this.partidoForm = {
      equipoLocal: 0,
      equipoVisitante: 0,
      deporte: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      arbitroId: null,
      golesLocal: 0,
      golesVisitante: 0,
      estado: 'pendiente',
      jornada: 1,
      observaciones: ''
    };
    this.mostrarFormulario = true;
  }

  editarPartido(partido: Partido) {
    this.editando = true;
    this.partidoForm = {
      id: partido.id,
      equipoLocal: typeof partido.equipoLocal === 'number' ? partido.equipoLocal : partido.equipoLocal.id,
      equipoVisitante: typeof partido.equipoVisitante === 'number' ? partido.equipoVisitante : partido.equipoVisitante.id,
      deporte: partido.deporte,
      fecha: partido.fecha instanceof Date ? partido.fecha.toISOString().split('T')[0] : partido.fecha.split('T')[0],
      hora: partido.hora,
      ubicacion: partido.ubicacion,
      arbitroId: partido.arbitroId && typeof partido.arbitroId === 'object' ? partido.arbitroId.id : partido.arbitroId ?? null,
      golesLocal: partido.golesLocal,
      golesVisitante: partido.golesVisitante,
      estado: partido.estado,
      jornada: partido.jornada || 1,
      observaciones: partido.observaciones || ''
    };
    this.mostrarFormulario = true;
  }

  guardarPartido() {
    if (!this.validarFormulario()) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const partidoData: Partial<Partido> = {
      ...this.partidoForm,
      arbitroId: this.partidoForm.arbitroId || undefined
    };

    if (this.editando && this.partidoForm.id) {
      this.db.updatePartido(this.partidoForm.id, partidoData).subscribe({
        next: () => {
          this.cargarDatos();
          this.cancelarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar partido:', err);
          alert('Error al actualizar el partido');
        }
      });
    } else {
      this.db.createPartido(partidoData as Partido).subscribe({
        next: () => {
          this.cargarDatos();
          this.cancelarFormulario();
        },
        error: (err) => {
          console.error('Error al crear partido:', err);
          alert('Error al crear el partido');
        }
      });
    }
  }

  eliminarPartido(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este partido?')) {
      this.db.deletePartido(id).subscribe({
        next: () => {
          this.cargarDatos();
        },
        error: (err) => {
          console.error('Error al eliminar partido:', err);
          alert('Error al eliminar el partido');
        }
      });
    }
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
  }

  validarFormulario(): boolean {
    return !!(
      this.partidoForm.equipoLocal &&
      this.partidoForm.equipoVisitante &&
      this.partidoForm.equipoLocal !== this.partidoForm.equipoVisitante &&
      this.partidoForm.deporte &&
      this.partidoForm.fecha &&
      this.partidoForm.hora &&
      this.partidoForm.ubicacion
    );
  }

  getEquipoNombre(equipo: number | { id: number; nombre: string; deporte: string; escudo?: string }): string {
    if (typeof equipo === 'number') {
      const equipoObj = this.equipos.find(e => e.id === equipo);
      return equipoObj?.nombre || 'Equipo no encontrado';
    }
    return equipo.nombre;
  }

  getArbitroNombre(arbitroId: number | { id: number; nombre: string } | null | undefined): string {
    if (!arbitroId) return 'Sin asignar';
    if (typeof arbitroId === 'number') {
      const arbitro = this.arbitros.find(a => a.id === arbitroId);
      return arbitro?.nombre || 'No asignado';
    }
    return arbitroId.nombre;
  }

  getEstadoClass(estado: string): string {
    const classes: { [key: string]: string } = {
      'pendiente': 'badge bg-warning text-dark',
      'en_progreso': 'badge bg-info',
      'finalizado': 'badge bg-success',
      'cancelado': 'badge bg-danger'
    };
    return classes[estado] || 'badge bg-secondary';
  }

  getEstadoLabel(estado: string): string {
    const labels: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'en_progreso': 'En Progreso',
      'finalizado': 'Finalizado',
      'cancelado': 'Cancelado'
    };
    return labels[estado] || estado;
  }

  filtrarArbitrosPorDeporte(): Arbitro[] {
    if (!this.partidoForm.deporte) return this.arbitros;
    return this.arbitros.filter(a => a.deporte === this.partidoForm.deporte);
  }

  filtrarEquiposPorDeporte(): Equipo[] {
    if (!this.partidoForm.deporte) return this.equipos;
    return this.equipos.filter(e => e.deporte === this.partidoForm.deporte);
  }
}
