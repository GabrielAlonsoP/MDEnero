// p-destacado.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PersonalService } from '../../services/personal.service';
import { Observable } from 'rxjs';

interface PersonalDestacado {
  id?: string;
  foto: string;
  nombre: string;
  grado: string;
}

@Component({
  selector: 'app-p-destacado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './p-destacado.component.html',
  styleUrl: './p-destacado.component.css'
})
export class PDestacadoComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  personalDestacado: PersonalDestacado[] = [];
  modalVisible = false;
  personalEnEdicion: PersonalDestacado | null = null;

  constructor(
    private authService: AuthService,
    private personalService: PersonalService
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarPersonalDestacado();
  }

  cargarPersonalDestacado() {
    this.personalService.getPersonalDestacado().subscribe({
      next: (personal: PersonalDestacado[]) => {
        this.personalDestacado = personal;
      },
      error: (error: any) => {
        console.error('Error al cargar personal:', error);
      }
    });
  }

  guardarCambios() {
    if (this.personalEnEdicion) {
      this.personalService.guardarPersonalDestacado(this.personalEnEdicion).subscribe({
        next: (response: any) => {
          this.cargarPersonalDestacado();
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al guardar personal:', error);
        }
      });
    }
  }

  editarPersonal(personal: PersonalDestacado) {
    this.personalEnEdicion = {...personal};
    this.modalVisible = true;
  }

  eliminarPersonal(personal: PersonalDestacado) {
    if (personal.id) {
      this.personalService.eliminarPersonal(personal.id).subscribe({
        next: () => {
          this.cargarPersonalDestacado();
        },
        error: (error: any) => {
          console.error('Error al eliminar personal:', error);
        }
      });
    }
  }

  agregarPersonal() {
    this.personalEnEdicion = {
      foto: 'assets/images/default.jpg',
      nombre: '',
      grado: ''
    };
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.personalEnEdicion = null;
  }

  onFotoSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.personalEnEdicion) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.personalEnEdicion && e.target?.result) {
          this.personalEnEdicion.foto = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}