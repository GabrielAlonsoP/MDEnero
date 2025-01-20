import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginCredentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí irá la lógica de autenticación cuando conectemos con el backend
    console.log('Credenciales:', this.credentials);
    
    // Por ahora solo simularemos el login
    localStorage.setItem('isAdmin', 'true');
    this.router.navigate(['/']);
  }
}