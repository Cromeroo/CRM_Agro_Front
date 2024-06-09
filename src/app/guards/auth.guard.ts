import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = this.authService.getCurrentUser();
    const requiredRoles = route.data['roles'] as Array<string>;

    if (
      requiredRoles &&
      !requiredRoles.some((role) => user.roles.includes(role))
    ) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getAuthToken();
    if (token) {
      this.router.navigate(['/dashboard']); // Redirige al dashboard si ya está logueado
      return false;
    }
    return true;
  }
}
