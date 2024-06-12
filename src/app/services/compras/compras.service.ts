import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api/v1/producto/compras/';

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
