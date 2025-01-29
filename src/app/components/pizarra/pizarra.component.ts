// pizarra.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PizarraService } from '../../services/pizarra.service';  // Añadir esta línea
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizarra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizarra.component.html',
  styleUrl: './pizarra.component.css'
})
export class PizarraComponent implements OnInit {  // Implementar OnInit
  currentDate: Date = new Date();
  contenido: string = '';
  isAdmin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private pizarraService: PizarraService  // Añadir esta línea
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarContenido();
  }

  cargarContenido() {
    this.pizarraService.getContenido().subscribe({
      next: (data) => {
        if (data && data.contenido) {
          this.contenido = data.contenido;
        }
      }
    });
  }

  onBlur() {
    if (this.contenido) {
      this.pizarraService.guardarContenido(this.contenido).subscribe();
    }
  }
}