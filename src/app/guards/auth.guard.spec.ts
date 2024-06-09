import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, AuthService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if no token is present', () => {
    spyOn(authService, 'getAuthToken').and.returnValue('');
    spyOn(router, 'navigate');

    const result = guard.canActivate(null as any, null as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access if token is present and user has required role', () => {
    spyOn(authService, 'getAuthToken').and.returnValue('some-token');
    spyOn(authService, 'getCurrentUser').and.returnValue({
      roles: ['superadmin'],
    });

    const routeMock: any = { data: { roles: ['superadmin'] } };
    const stateMock: any = {};

    const result = guard.canActivate(routeMock, stateMock);

    expect(result).toBeTrue();
  });

  it('should navigate to unauthorized if user does not have required role', () => {
    spyOn(authService, 'getAuthToken').and.returnValue('some-token');
    spyOn(authService, 'getCurrentUser').and.returnValue({ roles: ['user'] });
    spyOn(router, 'navigate');

    const routeMock: any = { data: { roles: ['superadmin'] } };
    const stateMock: any = {};

    const result = guard.canActivate(routeMock, stateMock);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
