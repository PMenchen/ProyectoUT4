import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

interface RegistroForm {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
  tipoUsuario: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  formulario: RegistroForm = {
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    tipoUsuario: 'usuario',
  };

  mostrarPassword = false;
  mostrarConfirmarPassword = false;
  errorMensaje = '';

  tiposUsuario = [
    { value: 'usuario', label: 'Usuario', icon: 'fa-user' },
    { value: 'arbitro', label: 'Árbitro', icon: 'fa-user-tie' },
    { value: 'capitan', label: 'Capitán de Equipo', icon: 'fa-user-shield' },
  ];

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmarPassword() {
    this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword;
  }

  cargando = false;
  mensajeExito = '';

  registrarse() {
    this.errorMensaje = '';
    this.mensajeExito = '';

    if (!this.formulario.nombre || !this.formulario.email || !this.formulario.password || !this.formulario.confirmarPassword) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }

    if (this.formulario.password !== this.formulario.confirmarPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden';
      return;
    }

    if (this.formulario.password.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.cargando = true;

    this.auth.register({
      nombre: this.formulario.nombre,
      email: this.formulario.email,
      password: this.formulario.password,
      tipo: this.formulario.tipoUsuario as 'admin' | 'usuario' | 'arbitro'
    }).subscribe({
      next: (response) => {
        this.cargando = false;
        if (response.success) {
          this.mensajeExito = 'Registro exitoso. Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMensaje = response.message || 'Error al registrar usuario';
        }
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error en registro:', error);
        this.errorMensaje = error.error?.message || 'Error al registrar. El email podría estar en uso.';
      }
    });
  }
}
