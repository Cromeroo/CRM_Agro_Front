import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  orders: any[] = [];
  allOrders: any = {
    user1: [
      { id: 1, product: 'Tomates', quantity: '100 kg', date: '2024-05-01' },
      { id: 2, product: 'Lechugas', quantity: '50 kg', date: '2024-05-03' },
    ],
    user2: [
      { id: 1, product: 'Zanahorias', quantity: '200 kg', date: '2024-05-02' },
      { id: 2, product: 'Cebollas', quantity: '80 kg', date: '2024-05-04' },
    ],
    user3: [
      { id: 1, product: 'Patatas', quantity: '150 kg', date: '2024-05-01' },
      { id: 2, product: 'Calabacines', quantity: '60 kg', date: '2024-05-05' },
    ],
  };

  constructor() {}

  ngOnInit(): void {


    //this.showOrders('user1');
  }

  showOrders(eventOrUser: Event | string): void {
    let user: string;
    if (typeof eventOrUser === 'string') {
      user = eventOrUser;
    } else {
      const target = eventOrUser.target as HTMLSelectElement;
      user = target.value;
    }
    this.orders = this.allOrders[user];
  }
}
