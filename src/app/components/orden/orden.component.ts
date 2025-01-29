// orden.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { OrdenService } from '../../services/orden.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export class OrdenComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private authService: AuthService,
    private ordenService: OrdenService,
    private sanitizer: DomSanitizer
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarUltimaOrden();
  }

  cargarUltimaOrden() {
    this.ordenService.getUltimaOrden().subscribe({
      next: (ordenes) => {
        if (ordenes && ordenes.length > 0) {
          const ultimaOrden = ordenes[0];
          // Construir la URL completa
          const pdfPath = `${environment.apiUrl}/${ultimaOrden.archivo}`;
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
        }
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Mostrar el PDF inmediatamente
      const fileUrl = URL.createObjectURL(file);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

      // Guardar en el servidor
      this.ordenService.subirOrden(file).subscribe({
        error: (error) => {
          console.error('Error al subir orden:', error);
        }
      });
    }
  }
}