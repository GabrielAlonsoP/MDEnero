import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cumpleanero {
  foto: string;
  nombre: string;
  fecha: string;  // 'DD/MM/YYYY'
}

@Component({
  selector: 'app-cumpleanos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cumpleanos.component.html',
  styleUrl: './cumpleanos.component.css',
  host: {
    'id': 'birthday'  // ID único estático
  }
  
})
export class CumpleanosComponent {
  cumpleaneros: Cumpleanero[] = [
    {
      foto: 'assets/images/empleado2.jpg',
      nombre: 'Ana Martínez Hidalgo',
      fecha: '16AGO2025'
    },
    {
      foto: 'assets/images/empleado2.jpg',
      nombre: 'Pedro Sánchez',
      fecha: '17ABR2025'
    },
    {
      foto: 'assets/images/empleado2.jpg',
      nombre: 'Laura Torres',
      fecha: '18MAR2025'
    }
  ];
}