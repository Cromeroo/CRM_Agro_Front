import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  email: string = '';
  roles: string[] = [];
  users: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  assignRole() {
    this.authService.assignRole(this.email, this.roles).subscribe(
      (response) => {
        this.successMessage = 'Roles asignados correctamente';
        this.loadUsers(); // Refrescar la lista de usuarios
        console.log('Roles asignados correctamente', response);
      },
      (error) => {
        this.errorMessage = 'Error asignando roles';
        console.error('Error asignando roles', error);
        console.error('Error asignando roles', error);
      }
    );
  }

  loadUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        this.users = response.users;
      },
      (error) => {
        console.error('Error cargando usuarios', error);
      }
    );
  }

  deleteUser(id: string) {
    this.authService.deleteUser(id).subscribe(
      (response) => {
        this.successMessage = 'Usuario eliminado correctamente';
        this.loadUsers();
      },
      (error) => {
        this.errorMessage = 'Error eliminando usuario';
        console.error('Error eliminando usuario', error);
      }
    );
  }
}
