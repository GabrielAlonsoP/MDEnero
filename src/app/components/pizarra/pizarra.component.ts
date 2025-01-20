import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizarra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizarra.component.html',
  styleUrl: './pizarra.component.css'
})
export class PizarraComponent {
  currentDate: Date = new Date();
  contenido: string = '';
}