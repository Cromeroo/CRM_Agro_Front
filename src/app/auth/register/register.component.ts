import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  numeroDocumento: string = '';
  tipoDocumento: string = '';
  constructor(private authService: AuthService) {}

  onRegister() {
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
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
  }
}
