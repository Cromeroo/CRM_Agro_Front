import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
