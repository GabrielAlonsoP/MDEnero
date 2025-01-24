import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PizarraComponent } from './components/pizarra/pizarra.component';
import { OrdenComponent } from './components/orden/orden.component'; 
import { PDestacadoComponent } from './components/p-destacado/p-destacado.component';
import { CumpleanosComponent } from './components/cumpleanos/cumpleanos.component';
// import { LoginComponent } from './components/login/login.component';

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
  title = 'mural-digital';
}