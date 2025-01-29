// src/app/services/personal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = `${environment.apiUrl}/api/personal`;

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

  // Para Personal Destacado
  getPersonalDestacado() {
    return this.http.get<any[]>(`${this.apiUrl}/destacados`);
  }

  guardarPersonalDestacado(personal: any) {
    const datos = {
      nombre: personal.nombre,
      grado: personal.grado,
      foto: personal.foto,
      destacado: true
    };
    return this.http.post(this.apiUrl, datos, this.getHeaders());
  }

  // Para Cumpleaños
  getCumpleaneros() {
    return this.http.get<any[]>(`${this.apiUrl}/cumpleanos`);
  }

  guardarCumpleanero(personal: any) {
    const datos = {
      nombre: personal.nombre,
      fechaNacimiento: personal.fechaCumple,
      foto: personal.foto,
      destacado: false
    };
    return this.http.post(this.apiUrl, datos, this.getHeaders());
  }

  eliminarPersonal(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}