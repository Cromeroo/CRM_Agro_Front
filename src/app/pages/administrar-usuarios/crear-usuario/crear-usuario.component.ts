import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioService = inject(UsuariosService);

  usuario = {
    nombre: '',
    numeroDocumento: '',
    email: '',
    password: '',
    tipoDocumento: '',
  };

  ngOnInit(): void {
    console.log('CrearUsuarioComponent inicializado');
  }

  crearUsuario() {
    console.log('Datos del usuario antes de enviar:', this.usuario);
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }
}
