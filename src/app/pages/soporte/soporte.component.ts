import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css',
})
export class SoporteComponent {
  noticiasDestacadas = {
    imagen: 'https://via.placeholder.com/800x400',
    titulo:
      'Agricultura Inteligente: El Camino Hacia una Producción Sostenible',
    descripcion:
      'La agricultura inteligente es un enfoque innovador que busca transformar la producción agrícola hacia un modelo más sostenible. Según la FAO, una agricultura próspera, inclusiva, sostenible, baja en emisiones...',
    autor: 'Danilo Romero',
    fecha: new Date(),
    lectura: 2,
  };

  noticias = [
    {
      imagen: 'https://via.placeholder.com/400x200',
      titulo:
        'Colombia: Liderazgo en la Planificación de Sistemas Alimentarios',
      descripcion:
        'Colombia está dando pasos significativos en la planificación de sistemas alimentarios...',
      link: '#',
    },
    {
      imagen: 'https://via.placeholder.com/400x200',
      titulo:
        'Disminución en el Consumo de Leche en Colombia: Un Reto para la Industria Láctea',
      descripcion:
        'El consumo de lácteos en Colombia ha experimentado una disminución significativa...',
      link: '#',
    },
    {
      imagen: 'https://via.placeholder.com/400x200',
      titulo: 'Café Robusta: Volatilidad Alta y Cercanía a Máximos Históricos',
      descripcion:
        'El café robusta ha estado fluctuando cerca de su máximo histórico en Londres...',
      link: '#',
    },
    // Puedes añadir más noticias aquí
  ];
}
