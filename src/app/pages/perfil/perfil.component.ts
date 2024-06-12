import { Component, OnInit } from '@angular/core';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../administrar-usuarios/crear-usuario/crear-usuario.component';
import { RoleManagementComponent } from '../administrar-roles/role-management/role-management.component';
import { CommonModule } from '@angular/common';
import { CompraService } from '../../services/compras/compras.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    UsuariosComponent,
    CrearUsuarioComponent,
    RoleManagementComponent,
    CommonModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  compras: any[] = [];
  usuario: any;

  constructor(
    private authService: AuthService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    if (this.usuario) {
      this.cargarCompras(this.usuario._id);
    }
  }

  cargarCompras(usuarioId: string): void {
    this.compraService.getComprasPorUsuario(usuarioId).subscribe(
      (response) => {
        this.compras = response.compras;
      },
      (error) => {
        console.error('Error al cargar compras del usuario:', error);
      }
    );
  }
}
