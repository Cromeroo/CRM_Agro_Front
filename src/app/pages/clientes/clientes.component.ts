import { Component } from '@angular/core';
import {} from '@angular/common/http';
import { ResetPasswordComponent } from '../../auth/reset-password/reset-password.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [ResetPasswordComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {
  constructor() {
    console.log('ClientesComponent inicializado');
  }
}
