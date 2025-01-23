import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs'; // Añadimos esta importación

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
 isAdmin$: Observable<boolean>;

 constructor(private authService: AuthService) {
   this.isAdmin$ = this.authService.isAdmin();
 }
}