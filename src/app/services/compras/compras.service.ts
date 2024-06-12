import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  constructor(private httpClient: HttpClient) {}

  crearCompra(compra: any): Observable<any> {
    return this.httpClient.post<any>(API_URL, compra);
  }

  getCompras(): Observable<{ ok: boolean; compras: any[] }> {
    return this.httpClient.get<{ ok: boolean; compras: any[] }>(
      `${API_URL}all`
    );
  }

  getComprasPorUsuario(
    usuarioId: string
  ): Observable<{ ok: boolean; compras: any[] }> {
    return this.httpClient.get<{ ok: boolean; compras: any[] }>(
      `${API_URL}usuario/${usuarioId}`
    );
  }
  getEstadisticas(productoId: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}estadisticas/${productoId}`);
  }
}
