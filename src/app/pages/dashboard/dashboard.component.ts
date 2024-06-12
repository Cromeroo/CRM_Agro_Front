import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditarProductoComponent } from '../editar-productos/editar-productos.component';
import { ProductosListComponent } from '../productos-list/productos-list.component';
import { ComprasComponent } from '../compras/compras.component';
import { ProductoEstadisticasComponent } from '../producto-estadisticas/producto-estadisticas.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    ProductosListComponent,
    ComprasComponent,
    ProductoEstadisticasComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  newRole: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        console.log('Usuarios cargados:', response);
        this.users = response;
      },
      (error) => {
        console.error('Error cargando usuarios', error);
      }
    );
  }

  deleteUser(id: string) {
    this.authService.deleteUser(id).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        this.loadUsers(); // No sirve!!!!!!!!!!!
      },
      (error) => {
        console.error('Error eliminando usuario', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
  }

  assignRole() {
    if (this.selectedUser && this.newRole) {
      if (!this.selectedUser.roles.includes(this.newRole)) {
        this.selectedUser.roles.push(this.newRole);
        this.updateRoles();
      } else {
        this.errorMessage = 'El usuario ya tiene este rol';
      }
    }
  }

  removeRole(role: string) {
    if (this.selectedUser) {
      this.selectedUser.roles = this.selectedUser.roles.filter(
        (r: string) => r !== role
      );
      this.updateRoles();
    }
  }

  updateRoles() {
    this.authService
      .assignRole(this.selectedUser.email, this.selectedUser.roles)
      .subscribe(
        (response) => {
          this.successMessage = 'Roles actualizados correctamente';
          this.loadUsers();
          this.selectedUser = null;
          this.newRole = '';
          console.log('Roles actualizados correctamente', response);
        },
        (error) => {
          this.errorMessage = 'Error actualizando roles';
          console.error('Error actualizando roles', error);
        }
      );
  }
}
