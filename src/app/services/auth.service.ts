import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/usuarios`;
  private platformId = inject(PLATFORM_ID);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.userRoleSubject.next(this.getStoredRole());
    }
  }

  private getStoredRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

// src/app/services/auth.service.ts
isAuthenticated(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token); // Para debug
    return !!token;
  }
  return false;
}

  login(usuario: string, password: string): Observable<boolean> {
    console.log('Intentando login con:', usuario);
    return this.http.post<{token: string, rol: string}>(`${this.apiUrl}/login`, { usuario, password })
      .pipe(
        tap(response => {
          console.log('Respuesta del servidor:', response);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.rol);
            this.userRoleSubject.next(response.rol);
            console.log('Role almacenado:', response.rol);
          }
        }),
        map(() => true)
      );
  }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      this.userRoleSubject.next(null);
    }
  }

  isAdmin(): Observable<boolean> {
    return this.userRoleSubject.pipe(
      map(role => role === 'admin')
    );
  }
}