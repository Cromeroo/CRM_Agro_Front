import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.base_url + '/producto/';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private httpClient: HttpClient) {}

  crearProducto(producto: any): Observable<any> {
    return this.httpClient.post(API_URL, producto);
  }

  getProductos(): Observable<any[]> {
    return this.httpClient
      .get<any>(API_URL)
      .pipe(map((response) => response.productos));
  }

  getUnProducto(id: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}${id}`);
  }

  updateProducto(id: string, producto: any): Observable<any> {
    return this.httpClient.put(`${API_URL}${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.httpClient.delete(`${API_URL}${id}`);
  }

  crearCompra(compra: any): Observable<any> {
    return this.httpClient.post(`${API_URL}compras/`, compra);
  }
}
