import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../services/compras/compras.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-estadisticas.component.html',
  styleUrls: ['./producto-estadisticas.component.css'],
})
export class ProductoEstadisticasComponent implements OnInit, AfterViewInit {
  productoId: string = '';
  totalCompras: number = 0;
  totalCantidad: number = 0;
  chart: Chart | undefined;

  constructor(
    private route: ActivatedRoute,
    private compraService: CompraService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productoId = params['id'];
      if (this.productoId) {
        this.obtenerEstadisticas();
      } else {
        console.error('No se proporcionó un productoId');
      }
    });
  }

  ngAfterViewInit(): void {
    // Agregar un pequeño retraso para asegurarse de que el canvas está en el DOM
    setTimeout(() => {
      this.generarGrafico();
    }, 500);
  }

  obtenerEstadisticas(): void {
    this.compraService.getEstadisticas(this.productoId).subscribe(
      (data) => {
        this.totalCompras = data.totalCompras;
        this.totalCantidad = data.totalCantidad;
        this.generarGrafico();
      },
      (error) => {
        console.error('Error al obtener estadísticas:', error);
      }
    );
  }

  generarGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Compras', 'Cantidad'],
          datasets: [
            {
              label: 'Estadísticas del Producto',
              data: [this.totalCompras, this.totalCantidad],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('No se pudo encontrar el elemento canvas');
    }
  }
}
