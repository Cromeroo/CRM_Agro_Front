import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos/productos.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ComprasComponent } from '../compras/compras.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [CommonModule, ComprasComponent],
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  selectedProductos: { producto: any; cantidad: number }[] = [];
  private baseUrl: string = 'http://localhost:4000';

  constructor(
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos.map((producto) => {
          producto.imagenUrl = this.baseUrl + producto.imagenUrl;
          console.log('Producto cargado:', producto);
          return producto;
        });
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  agregarProducto(producto: any) {
    const found = this.selectedProductos.find(
      (p) => p.producto._id === producto._id
    );
    if (found) {
      found.cantidad++;
    } else {
      this.selectedProductos.push({ producto, cantidad: 1 });
    }
  }

  eliminarProducto(item: { producto: any; cantidad: number }) {
    const index = this.selectedProductos.indexOf(item);
    if (index > -1) {
      this.selectedProductos.splice(index, 1);
    }
  }

  comprar() {
    const usuario = this.authService.getCurrentUser();
    if (!usuario) {
      Swal.fire('Error', 'Debes iniciar sesión para comprar', 'error');
      return;
    }

    const compra = {
      usuarioId: usuario._id,
      productos: this.selectedProductos.map((p) => ({
        producto: p.producto._id,
        cantidad: p.cantidad,
      })),
    };

    this.productoService.crearCompra(compra).subscribe(
      (response) => {
        console.log('Compra exitosa:', response);
        this.selectedProductos = [];
        Swal.fire(
          'Compra Exitosa',
          'Tu compra ha sido realizada con éxito',
          'success'
        );
      },
      (error) => {
        console.error('Error en la compra:', error);
        Swal.fire(
          'Error',
          'Hubo un error al realizar la compra. Intenta nuevamente.',
          'error'
        );
      }
    );
  }
}
