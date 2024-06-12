import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { routes } from './app.routes';
import { FooterComponent } from './shared/footer/footer.component';
import { CustomToastrModule } from './auth/toastr.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    InicioComponent,
    HttpClientModule,
    ClientesComponent,
    ResetPasswordComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'crm';

  constructor() {
    console.log('AppComponent inicializado');
  }
}
