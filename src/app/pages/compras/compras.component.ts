import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compras/compras.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  comprasUsuario: any[] = [];
  comprasGenerales: any[] = [];

  constructor(
    private compraService: CompraService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getCurrentUser();
    if (usuario) {
      this.compraService.getComprasPorUsuario(usuario._id).subscribe(
        (compras) => {
          this.comprasUsuario = compras.compras;
        },
        (error) => {
          console.error('Error al cargar compras del usuario:', error);
        }
      );
    }

    this.compraService.getCompras().subscribe(
      (compras) => {
        this.comprasGenerales = compras.compras;
      },
      (error) => {
        console.error('Error al cargar compras generales:', error);
      }
    );
  }
}
