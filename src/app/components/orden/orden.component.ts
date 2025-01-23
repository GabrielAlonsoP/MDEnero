// orden.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
 selector: 'app-orden',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './orden.component.html',
 styleUrl: './orden.component.css'
})
export class OrdenComponent {
 isAdmin$: Observable<boolean>;
 pdfUrl: SafeResourceUrl | null = null;

 constructor(
   private authService: AuthService,
   private sanitizer: DomSanitizer
 ) {
   this.isAdmin$ = this.authService.isAdmin();
 }

 onFileSelected(event: any) {
   const file = event.target.files[0];
   if (file && file.type === 'application/pdf') {
     const fileUrl = URL.createObjectURL(file);
     this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
   }
 }
}