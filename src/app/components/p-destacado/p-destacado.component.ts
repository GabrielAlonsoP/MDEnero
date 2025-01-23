// p-destacado.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

interface PersonalDestacado {
 id: number;
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
export class PDestacadoComponent {
 isAdmin$: Observable<boolean>;
 personalDestacado: PersonalDestacado[] = [
   { id: 1, foto: 'assets/images/empleado1.jpg', nombre: 'Juan Pérez', grado: 'Sargento' },
   { id: 2, foto: 'assets/images/empleado2.jpg', nombre: 'María González', grado: 'Teniente' },
   { id: 3, foto: 'assets/images/empleado1.jpg', nombre: 'Carlos Rodríguez', grado: 'Capitán' }
 ];
 modalVisible = false;
 personalEnEdicion: PersonalDestacado | null = null;

 constructor(private authService: AuthService) {
   this.isAdmin$ = this.authService.isAdmin();
 }

 editarPersonal(personal: PersonalDestacado) {
   this.personalEnEdicion = {...personal};
   this.modalVisible = true;
 }

 guardarCambios() {
  if (this.personalEnEdicion) {
    const index = this.personalDestacado.findIndex(p => p.id === this.personalEnEdicion!.id);
    if (index !== -1) {
      this.personalDestacado[index] = {...this.personalEnEdicion};
    } else {
      this.personalDestacado.push(this.personalEnEdicion);
    }
  }
  this.cerrarModal();
}

 eliminarPersonal(personal: PersonalDestacado) {
   this.personalDestacado = this.personalDestacado.filter(p => p.id !== personal.id);
 }

 agregarPersonal() {
   const nuevoId = Math.max(...this.personalDestacado.map(p => p.id)) + 1;
   this.personalEnEdicion = {
     id: nuevoId,
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
       if (this.personalEnEdicion) {
         this.personalEnEdicion.foto = e.target?.result as string;
       }
     };
     reader.readAsDataURL(file);
   }
 }
}