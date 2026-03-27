import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

interface FormularioContacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  @ViewChild('toastElement') toastElement!: ElementRef;
  @ViewChild('contactForm') contactForm!: ElementRef;

  formulario: FormularioContacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  };

  constructor() {}

  ngOnInit() {}

  enviarFormulario() {
    if (this.formulario.nombre && this.formulario.email && this.formulario.asunto && this.formulario.mensaje) {
      if (typeof window !== 'undefined' && (window as any).bootstrap) {
        const toastEl = this.toastElement?.nativeElement;
        if (toastEl) {
          const toast = new bootstrap.Toast(toastEl);
          toast.show();
        }
      }

      this.formulario = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
      };

      if (this.contactForm?.nativeElement) {
        this.contactForm.nativeElement.reset();
      }
    }
  }
}
