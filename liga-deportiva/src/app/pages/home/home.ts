import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';

declare const bootstrap: any;

interface Noticia {
  id: number;
  title: string;
  shortDesc: string;
  image: string;
  date: string;
  content: string;
}

interface Competicion {
  id: string;
  name: string;
  icon: string;
  teams: number;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild('inscripcionModal') inscripcionModal!: ElementRef;
  @ViewChild('toastElement') toastElement!: ElementRef;
  @ViewChild('formElement') formElement!: ElementRef;

  slideCounter = 1;
  bootstrapReady = false;

  formData = {
    nombre: '',
    email: '',
    deporte: '',
    comentarios: ''
  };

  constructor(private db: Database) {}

  noticias: Noticia[] = [
    {
      id: 1,
      title: '¡Final Emocionante de Fútbol!',
      shortDesc: 'El equipo Los Tigres gana el campeonato en penaltis',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      date: '15 Enero 2025',
      content: 'En un partido épico lleno de emociones, Los Tigres se coronaron campeones del torneo de fútbol tras vencer en tanda de penaltis 5-4 a Las Águilas. El portero destacó con dos atajadas cruciales que aseguraron el título para su equipo.',
    },
    {
      id: 2,
      title: 'Inauguración Temporada Baloncesto',
      shortDesc: 'Nueva temporada comienza con récord de inscripciones',
      image: 'https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg',
      date: '10 Mayo 2025',
      content: 'La liga de baloncesto rompe récords con 12 equipos inscritos esta temporada. La inauguración contó con la presencia del director del instituto y promete ser la mejor temporada hasta la fecha.',
    },
    {
      id: 3,
      title: 'Torneo de Voleibol Anunciado',
      shortDesc: 'Equipos mixtos competirán el próximo mes',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
      date: '8 Abril 2025',
      content: 'El departamento deportivo anuncia el primer torneo de voleibol mixto. Las inscripciones están abiertas hasta el 20 de mayo. Se esperan al menos 8 equipos participantes.',
    },
  ];

  competiciones: Competicion[] = [
    { id: 'Fútbol', name: 'Fútbol', icon: 'fa-solid fa-futbol', teams: 0, color: 'success' },
    { id: 'Baloncesto', name: 'Baloncesto', icon: 'fa-solid fa-basketball', teams: 0, color: 'danger' },
    { id: 'Voleibol', name: 'Voleibol', icon: 'fa-solid fa-volleyball', teams: 0, color: 'primary' },
    { id: 'Balonmano', name: 'Balonmano', icon: 'fa-solid fa-hand-fist', teams: 0, color: 'secondary' },
  ];

  ngOnInit() {
    this.checkBootstrap();
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.db.getEquipos().subscribe({
      next: (response: any) => {
        const equipos = response.data || response;

        this.competiciones.forEach(comp => {
          comp.teams = equipos.filter((e: any) => e.deporte === comp.id).length;
        });
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initBootstrapEvents();
    }, 500);
  }

  checkBootstrap() {
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      this.bootstrapReady = true;
      return true;
    }

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).bootstrap) {
        this.bootstrapReady = true;
        clearInterval(interval);
      }
    }, 100);

    return false;
  }

  initBootstrapEvents() {
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const carouselElement = document.getElementById('newsCarousel');
      if (carouselElement) {
        carouselElement.addEventListener('slid.bs.carousel', (event: any) => {
          this.slideCounter = event.to + 1;
        });
      }
    }
  }

  handleFormSubmit() {
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const modalElement = this.inscripcionModal?.nativeElement;
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      const toastEl = this.toastElement?.nativeElement;
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      if (this.formElement?.nativeElement) {
        this.formElement.nativeElement.reset();
      }
    }
  }
}
