import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any;
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${API_URL}/login`, { email, password });
  }

  register(
    nombre: string,
    email: string,
    password: string,
    numeroDocumento: string,
    tipoDocumento: string
  ): Observable<any> {
    return this.httpClient.post(`${API_URL}/login/register`, {
      nombre,
      email,
      password,
      numeroDocumento,
      tipoDocumento,
    });
  }

  assignRole(email: string, roles: string[]): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.getToken());
    return this.httpClient.post(
      `${API_URL}/roles/assign-role`,
      { email, roles },
      { headers }
    );
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.getToken());
    return this.httpClient.get(`${API_URL}/admin/users`, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.getToken());
    return this.httpClient.delete(`${API_URL}/admin/users/${id}`, { headers });
  }

  forgotPassword(email: string, numeroDocumento: string): Observable<any> {
    return this.httpClient.post(`${API_URL}/login/olvidocontrasena`, {
      email,
      numeroDocumento,
    });
  }

  changePassword(token: string, password: string): Observable<any> {
    const tokenOnly = token.split('token=')[1];

    const headers = new HttpHeaders().set('x-token', tokenOnly);

    console.log('Token enviado en la cabecera:', tokenOnly);
    return this.httpClient.put(
      `${API_URL}/login/cambiocontrasena`,
      { password },
      { headers }
    );
  }

  public getAuthToken(): string {
    return this.getToken();
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public getCurrentUser(): any {
    if (!this.currentUser) {
      const userJson = localStorage.getItem('currentUser');
      this.currentUser = userJson ? JSON.parse(userJson) : null;
    }
    return this.currentUser;
  }

  public setCurrentUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.authStatus.next(true);
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.authStatus.next(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
