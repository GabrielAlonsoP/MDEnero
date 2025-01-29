// cumpleanos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PersonalService } from '../../services/personal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cumpleanos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cumpleanos.component.html',
  styleUrl: './cumpleanos.component.css'
})
export class CumpleanosComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  cumpleaneros: any[] = [];
  modalVisible = false;
  personaEnEdicion: any = null;

  constructor(
    private authService: AuthService,
    private personalService: PersonalService
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarCumpleaneros();
  }

  cargarCumpleaneros() {
    this.personalService.getCumpleaneros().subscribe({
      next: (personal) => {
        this.cumpleaneros = personal;
      },
      error: (error) => console.error('Error:', error)
    });
  }

  editarPersona(persona: any) {
    this.personaEnEdicion = {...persona};
    this.modalVisible = true;
  }

  guardarCambios() {
    if (this.personaEnEdicion) {
      this.personalService.guardarCumpleanero(this.personaEnEdicion).subscribe({
        next: () => {
          this.cargarCumpleaneros();
          this.cerrarModal();
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  eliminarPersona(persona: any) {
    if (persona.id) {
      this.personalService.eliminarPersonal(persona.id).subscribe({
        next: () => {
          this.cargarCumpleaneros();
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  agregarPersona() {
    this.personaEnEdicion = {
      foto: 'assets/images/default.jpg',
      nombre: '',
      fechaCumple: ''
    };
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.personaEnEdicion = null;
  }

  onFotoSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.personaEnEdicion) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.personaEnEdicion && e.target?.result) {
          this.personaEnEdicion.foto = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}