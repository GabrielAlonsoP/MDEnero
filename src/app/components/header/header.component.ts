// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

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

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  toggleLogin() {
    this.showLoginModal = !this.showLoginModal;
  }

  onLoginSuccess() {
    this.showLoginModal = false;
  }

  logout() {
    this.authService.logout();
  }
}