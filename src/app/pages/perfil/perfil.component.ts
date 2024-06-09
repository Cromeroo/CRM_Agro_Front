import { Component } from '@angular/core';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../administrar-usuarios/crear-usuario/crear-usuario.component';
import { RoleManagementComponent } from '../administrar-roles/role-management/role-management.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [UsuariosComponent, CrearUsuarioComponent, RoleManagementComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {}
