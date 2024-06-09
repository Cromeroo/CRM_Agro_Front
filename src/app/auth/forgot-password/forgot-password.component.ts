import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  numeroDocumento: string = '';

  constructor(private authService: AuthService) {}

  onForgotPassword() {
    this.authService.forgotPassword(this.email, this.numeroDocumento).subscribe(
      (response) => {
        console.log('Recuperación de contraseña exitosa:', response);
      },
      (error) => {
        console.error('Error en la recuperación de contraseña:', error);
      }
    );
  }
}
