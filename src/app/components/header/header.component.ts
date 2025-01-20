import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title1: string = 'Mural Digital';
  title2: string = 'Brigada de Inteligencia';
  showLoginModal: boolean = false;

  toggleLogin() {
    this.showLoginModal =!this.showLoginModal;
  }
}