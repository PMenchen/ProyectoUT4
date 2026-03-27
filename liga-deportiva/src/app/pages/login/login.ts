import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formulario: LoginForm = {
    email: '',
    password: '',
  };

  mostrarPassword = false;
  errorMensaje = '';
  cargando = false;

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  iniciarSesion() {
    this.errorMensaje = '';

    if (!this.formulario.email || !this.formulario.password) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }

    this.cargando = true;

    this.auth.login({
      email: this.formulario.email,
      password: this.formulario.password
    }).subscribe({
      next: (response) => {
        this.cargando = false;
        if (response.success && response.user) {
          const user = response.user;

          if (user.tipo === 'admin') {
            this.router.navigate(['/']);
          } else if (user.tipo === 'arbitro') {
            this.router.navigate(['/resultados']);
          } else if (user.tipo === 'capitan') {
            this.router.navigate(['/equipos']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMensaje = response.message || 'Error al iniciar sesión';
        }
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error en login:', error);
        this.errorMensaje = error.error?.message || 'Credenciales incorrectas. Verifica tu email y contraseña.';
      }
    });
  }
}
