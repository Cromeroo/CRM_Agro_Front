import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductoService } from '../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  productoId: string;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      referencia: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
    });
    this.productoId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productoService.getUnProducto(this.productoId).subscribe(
      (producto) => {
        this.productoForm.patchValue(producto);
      },
      (error) => {
        console.error('Error al cargar producto:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.productoForm.get('nombre')?.value ?? '');
    formData.append(
      'referencia',
      this.productoForm.get('referencia')?.value ?? ''
    );
    formData.append('cantidad', this.productoForm.get('cantidad')?.value ?? '');
    formData.append('precio', this.productoForm.get('precio')?.value ?? '');
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.productoService.updateProducto(this.productoId, formData).subscribe(
      (response) => {
        Swal.fire('Actualizado', 'El producto ha sido actualizado', 'success');
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        Swal.fire('Error', 'Hubo un error al actualizar el producto', 'error');
      }
    );
  }
}
