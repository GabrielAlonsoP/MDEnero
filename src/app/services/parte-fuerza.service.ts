// src/app/services/parte-fuerza.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParteFuerzaService {
  private apiUrl = `${environment.apiUrl}/api/parte-fuerza`;

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

  getDocumentos() {
    // No necesita headers de autenticación para GET
    return this.http.get<any>(this.apiUrl);
  }
  subirDocumento(formData: FormData) {
  // Ya no necesita headers de autenticación
    return this.http.post(this.apiUrl, formData);
}

  eliminarDocumento(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}