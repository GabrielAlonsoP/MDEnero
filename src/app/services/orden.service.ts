// src/app/services/orden.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = `${environment.apiUrl}/api/orden`;

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

  getUltimaOrden() {
    return this.http.get<any>(this.apiUrl);
  }

  subirOrden(archivo: File) {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('titulo', archivo.name);
    return this.http.post(this.apiUrl, formData, this.getHeaders());
  }
}