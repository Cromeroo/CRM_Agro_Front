import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const API_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private httpClient: HttpClient) {}

  crearUsuario(usuario: any) {
    return this.httpClient.post(API_URL, usuario);
  }

  getUsuarios() {
    return this.httpClient.get(API_URL);
  }
  getUnUsuario(id: string) {
    return this.httpClient.get(`${API_URL}/${id}`);
  }
}
