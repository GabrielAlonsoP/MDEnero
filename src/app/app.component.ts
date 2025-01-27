// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PizarraComponent } from './components/pizarra/pizarra.component';
import { OrdenComponent } from './components/orden/orden.component'; 
import { PDestacadoComponent } from './components/p-destacado/p-destacado.component';
import { CumpleanosComponent } from './components/cumpleanos/cumpleanos.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // RouterOutlet,
    HeaderComponent,
    PizarraComponent,
    OrdenComponent,
    PDestacadoComponent,
    CumpleanosComponent,
    // LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('¿Está autenticado?', this.authService.isAuthenticated()); // Para debug
  }

  isAuthenticated() {
    const auth = this.authService.isAuthenticated();
    console.log('Estado de autenticación:', auth); // Para debug
    return auth;
  }
}