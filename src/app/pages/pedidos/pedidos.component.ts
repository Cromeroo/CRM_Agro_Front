import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CompraService } from '../../services/compras/compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  usuario: any;
  compras: any[] = [];

  constructor(
    private authService: AuthService,
    private compraService: CompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    if (this.usuario) {
      this.cargarCompras(this.usuario._id);
    } else {
      this.router.navigate(['/login']);
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
