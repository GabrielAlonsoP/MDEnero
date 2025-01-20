import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PersonalDestacado {
  foto: string;
  nombre: string;
  grado: string;
}

@Component({
  selector: 'app-p-destacado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './p-destacado.component.html',
  styleUrl: './p-destacado.component.css'
})
export class PDestacadoComponent {
  personalDestacado: PersonalDestacado[] = [
    {
      foto: 'assets/images/empleado1.jpg',
      nombre: 'Juan Pérez',
      grado: 'Sargento'
    },
    {
      foto: 'assets/images/empleado2.jpg',
      nombre: 'María González',
      grado: 'Teniente'
    },
    {
      foto: 'assets/images/empleado1.jpg',
      nombre: 'Carlos Rodríguez',
      grado: 'Capitán'
    }
  ];
}