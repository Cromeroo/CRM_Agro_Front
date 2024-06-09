import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './auth/login/login.component';
import { RoleManagementComponent } from './pages/administrar-roles/role-management/role-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard, LoginGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: PATH.HOME,
    title: 'Home',
    component: InicioComponent,
  },
  {
    path: PATH.PEDIDOS,
    title: 'Pedidos',
    component: PedidosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: PATH.PERFIL,
    title: 'Perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: PATH.CLIENTES,
    title: 'Clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: PATH.LOGIN,
    title: 'Login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: PATH.ROLES,
    title: 'Administrar Roles',
    component: RoleManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: PATH.DASHBOARD,
    title: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['superadmin', 'admin'] },
  },
  {
    path: PATH.FORGOT,
    title: 'Forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: PATH.REGISTER,
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: PATH.RESET,
    title: 'Reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '**',
    redirectTo: PATH.HOME,
  },
];
