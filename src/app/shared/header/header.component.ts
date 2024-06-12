import { Component, OnInit } from '@angular/core';
import { MenuRoutes } from '../../menu/menu';
import { MenuInfoInterface } from '../../core/interface/menu_info.interface';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuItems: MenuInfoInterface[] = [];
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.menuItems = MenuRoutes;
    this.authService.isAuthenticated().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (status) {
        this.currentUser = this.authService.getCurrentUser();
        this.updateMenuForAdmin();
      } else {
        this.currentUser = null;
        this.resetMenu();
      }
    });
  }

  updateMenuForAdmin(): void {
    this.resetMenu();
    if (
      this.currentUser &&
      (this.currentUser.roles.includes('admin') ||
        this.currentUser.roles.includes('superadmin'))
    ) {
      this.menuItems.push({
        path: '/Dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        classCss: '',
        subMenu: [],
      });
    }
  }

  resetMenu(): void {
    this.menuItems = [...MenuRoutes];
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.resetMenu();
    this.router.navigate(['/']);
  }
}
