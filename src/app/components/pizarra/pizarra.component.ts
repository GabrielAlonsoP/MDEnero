// src/app/components/pizarra/pizarra.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PizarraService } from '../../services/pizarra.service';
import { Observable } from 'rxjs';

interface CuadroTexto {
  texto: string;
  orden: number;
}

@Component({
  selector: 'app-pizarra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizarra.component.html',
  styleUrl: './pizarra.component.css'
})
export class PizarraComponent implements OnInit {
  readonly MAXIMO_CUADROS = 5;
  currentDate: Date = new Date();
  contenidos: CuadroTexto[] = [];
  isAdmin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private pizarraService: PizarraService
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarContenido();
  }

  cargarContenido() {
    this.pizarraService.getContenido().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data && data.contenidos && Array.isArray(data.contenidos)) {
          this.contenidos = data.contenidos;
          if (this.contenidos.length === 0) {
            this.contenidos = [{ texto: '', orden: 0 }];
          }
        } else {
          this.contenidos = [{ texto: '', orden: 0 }];
        }
        console.log('Contenidos cargados:', this.contenidos);
      },
      error: (error) => {
        console.error('Error al cargar contenido:', error);
        this.contenidos = [{ texto: '', orden: 0 }];
      }
    });
  }

  agregarCuadro() {
    if (this.contenidos.length < this.MAXIMO_CUADROS) {
      const nuevoOrden = this.contenidos.length;
      this.contenidos.push({ texto: '', orden: nuevoOrden });
      this.guardarCambios();
    }
  }

  eliminarCuadro(index: number) {
    this.contenidos.splice(index, 1);
    this.guardarCambios();
  }

  guardarCambios() {
    if (this.contenidos.length > 0) {
      console.log('Guardando contenidos:', this.contenidos);
      this.pizarraService.guardarContenido(this.contenidos).subscribe({
        next: (response) => {
          console.log('Guardado exitoso:', response);
        },
        error: (error) => {
          console.error('Error al guardar:', error);
        }
      });
    }
  }
  puedeAgregarCuadro(): boolean {
    return this.contenidos.length < this.MAXIMO_CUADROS;
  }
}