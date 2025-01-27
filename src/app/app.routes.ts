// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PizarraComponent } from './components/pizarra/pizarra.component';
import { OrdenComponent } from './components/orden/orden.component';
import { PDestacadoComponent } from './components/p-destacado/p-destacado.component';
import { CumpleanosComponent } from './components/cumpleanos/cumpleanos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    children: [
      { path: 'pizarra', component: PizarraComponent },
      { path: 'orden', component: OrdenComponent },
      { path: 'destacado', component: PDestacadoComponent },
      { path: 'cumpleanos', component: CumpleanosComponent },
      { path: '', redirectTo: 'pizarra', pathMatch: 'full' }
    ],
    canActivate: [authGuard]
  }
];