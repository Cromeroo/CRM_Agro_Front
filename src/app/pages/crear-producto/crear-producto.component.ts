import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductoService } from '../../services/productos/productos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  selectedFile: File | null = null;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      referencia: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.productoForm.invalid || !this.selectedFile) {
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
    formData.append(
      'imagen',
      this.selectedFile!,
      this.selectedFile?.name ?? ''
    );

    this.productoService.crearProducto(formData).subscribe(
      (response) => {
        console.log('Producto creado exitosamente:', response);
        this.mensajeExito = 'Producto creado exitosamente';
        this.mensajeError = null;
        setTimeout(() => {
          this.router.navigate(['/productos']);
        }, 3000);
      },
      (error) => {
        console.error('Error al crear el producto:', error);
        this.mensajeExito = null;
        this.mensajeError =
          'Error al crear el producto. Por favor, inténtelo de nuevo.';
      }
    );
  }
}
