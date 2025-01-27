// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';  // Agregar este import

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title: string = 'Mural Digital';
  title2: string = 'Brigada de Inteligencia';
  showLoginModal: boolean = false;
  isAdmin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('Iniciando HeaderComponent');
    this.isAdmin$ = this.authService.isAdmin();
    this.isAdmin$.subscribe(isAdmin => {
      console.log('Estado de admin:', isAdmin);
    });
  }

  toggleLogin() {
    this.showLoginModal = !this.showLoginModal;
  }

  onLoginSuccess() {
    this.showLoginModal = false;
    this.isAdmin$ = this.authService.isAdmin(); // Actualizar estado admin
    window.location.reload(); // Forzar recarga para actualizar permisos
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir después del logout
  }
}