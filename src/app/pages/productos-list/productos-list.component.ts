import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos/productos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductosListComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  editarProducto(productoId: string): void {
    this.router.navigate(['/editar-producto', productoId]);
  }

  eliminarProducto(productoId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(productoId).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
            this.cargarProductos();
          },
          (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el producto',
              'error'
            );
          }
        );
      }
    });
  }
  verEstadisticas(productoId: string): void {
    this.router.navigate(['/producto-estadisticas', productoId]);
  }
}
