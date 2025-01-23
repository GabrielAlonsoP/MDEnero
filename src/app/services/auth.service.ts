import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  
  private readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  constructor(private router: Router) {
    // Solo verificar sesión si estamos en el navegador
    if (typeof window !== 'undefined') {
      this.checkStoredSession();
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.ADMIN_CREDENTIALS.username && 
        password === this.ADMIN_CREDENTIALS.password) {
      
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(true);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'true');
      }
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('isAdmin');
    }
    
    this.router.navigate(['/login']);
  }

  private checkStoredSession(): void {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      
      if (isAuthenticated) {
        this.isAuthenticatedSubject.next(true);
        this.isAdminSubject.next(isAdmin);
      }
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
}