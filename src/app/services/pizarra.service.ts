// src/app/services/pizarra.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PizarraService {
  private apiUrl = `${environment.apiUrl}/api/pizarra`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getContenido() {
    return this.http.get<any>(this.apiUrl);
  }

  guardarContenido(contenido: string) {
    return this.http.post(this.apiUrl, { contenido }, this.getHeaders());
  }
}