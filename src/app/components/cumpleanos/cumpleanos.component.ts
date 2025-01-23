// cumpleanos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

interface Cumpleanero {
 id: number;
 foto: string;
 nombre: string;
 fechaCumple: string;
}

@Component({
 selector: 'app-cumpleanos',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './cumpleanos.component.html',
 styleUrl: './cumpleanos.component.css'
})
export class CumpleanosComponent {
 isAdmin$: Observable<boolean>;
 cumpleaneros: Cumpleanero[] = [
   { id: 1, foto: 'assets/images/empleado1.jpg', nombre: 'Ana Martínez', fechaCumple: '1990-05-15' },
   { id: 2, foto: 'assets/images/empleado2.jpg', nombre: 'Pedro Sánchez', fechaCumple: '1985-07-22' },
   { id: 3, foto: 'assets/images/empleado1.jpg', nombre: 'Laura Torres', fechaCumple: '1992-03-10' }
 ];
 modalVisible = false;
 personaEnEdicion: Cumpleanero | null = null;

 constructor(private authService: AuthService) {
   this.isAdmin$ = this.authService.isAdmin();
 }

 editarPersona(persona: Cumpleanero) {
   this.personaEnEdicion = {...persona};
   this.modalVisible = true;
 }

 guardarCambios() {
   if (this.personaEnEdicion) {
     const index = this.cumpleaneros.findIndex(p => p.id === this.personaEnEdicion!.id);
     if (index !== -1) {
       this.cumpleaneros[index] = {...this.personaEnEdicion};
     } else {
       this.cumpleaneros.push(this.personaEnEdicion);
     }
   }
   this.cerrarModal();
 }

 eliminarPersona(persona: Cumpleanero) {
   this.cumpleaneros = this.cumpleaneros.filter(p => p.id !== persona.id);
 }

 agregarPersona() {
   const nuevoId = Math.max(...this.cumpleaneros.map(p => p.id)) + 1;
   this.personaEnEdicion = {
     id: nuevoId,
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
       if (this.personaEnEdicion) {
         this.personaEnEdicion.foto = e.target?.result as string;
       }
     };
     reader.readAsDataURL(file);
   }
 }
}