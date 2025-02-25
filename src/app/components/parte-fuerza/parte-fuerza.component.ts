// src/app/components/parte-fuerza/parte-fuerza.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ParteFuerzaService } from '../../services/parte-fuerza.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

interface Documento {
  _id: string;
  titulo: string;
  archivo: string;
  fechaPublicacion: Date;
}

@Component({
  selector: 'app-parte-fuerza',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parte-fuerza.component.html',
  styleUrl: './parte-fuerza.component.css'
})
export class ParteFuerzaComponent implements OnInit {
  documentos: Documento[] = [];
  currentDate: Date = new Date();

  constructor(
    private parteFuerzaService: ParteFuerzaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.parteFuerzaService.getDocumentos().subscribe({
      next: (data) => {
        if (data && data.documentos) {
          this.documentos = data.documentos.sort((a: Documento, b: Documento) => 
            new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
          );
        }
      },
      error: (error) => console.error('Error al cargar documentos:', error)
    });
  }

  eliminarDocumento(id: string) {
    if(confirm('¿Está seguro que desea eliminar este documento?')) {
      this.parteFuerzaService.eliminarDocumento(id).subscribe({
        next: () => {
          this.cargarDocumentos();
        },
        error: (error) => console.error('Error al eliminar documento:', error)
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('archivo', file);
      formData.append('titulo', file.name);
      
      this.parteFuerzaService.subirDocumento(formData).subscribe({
        next: () => {
          this.cargarDocumentos();
        },
        error: (error) => console.error('Error al subir documento:', error)
      });
    }
  }

  getSafeUrl(archivo: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/${archivo}`);
  }
}