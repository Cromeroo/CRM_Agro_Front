import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  nombre: string = '';
  numeroDocumento: string = '';
  errorMessage: string = '';
  tipoDocumento: string = '';
  isRegistering: boolean = false;
  isRecoveringPassword: boolean = false;
  successMessage: string = '';
  tipoDocumentos: string[] = [
    'Cédula de Ciudadanía',
    'Tarjeta de Identidad',
    'Cédula de Extranjería',
    'NIT',
  ];

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.clearMessages();
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        this.authService.setCurrentUser(response.usuario);
        this.router.navigate(['/Productos']);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    );
  }

  onRegister() {
    this.clearMessages();
    this.authService
      .register(
        this.nombre,
        this.email,
        this.password,
        this.numeroDocumento,
        this.tipoDocumento
      )
      .subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          this.successMessage =
            'Registration successful! Redirecting to dashboard...';
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 3000);
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }

  onForgotPassword() {
    this.isRecoveringPassword = true;
    this.isRegistering = false;
    this.clearMessages();
  }

  onSendRecoveryEmail() {
    this.clearMessages();
    this.authService.forgotPassword(this.email, this.numeroDocumento).subscribe(
      (response) => {
        console.log('Recuperación de contraseña exitosa:', response);
        this.isRecoveringPassword = false;
        this.successMessage = 'Recovery email sent. Please check your inbox.';
      },
      (error) => {
        console.error('Error en la recuperación de contraseña:', error);
        this.errorMessage = 'Password recovery failed. Please try again.';
      }
    );
  }

  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.isRecoveringPassword = false;
    this.clearMessages();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
