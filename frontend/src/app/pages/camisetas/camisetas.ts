import { Component, Injector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { CamisetasService } from '../../services/camisetas';
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

export interface Camiseta {
  id: number;
  descripcion: string;
  precio: number;
  imagen_principal: string;
}

@Component({
  selector: 'app-camisetas',
  standalone: true,
  imports: [Header, Footer, RouterLink], 
  templateUrl: './camisetas.html',
  styleUrl: './camisetas.css'
})
export class Camisetas {
  private route = inject(ActivatedRoute); 
  private camisetasService = inject(CamisetasService);
  
  camisetas: Camiseta[] = [];
  error: string = '';
  nombreEquipoActual: string = '';

  constructor() {
    this.route.paramMap.pipe(
      takeUntilDestroyed() 
    ).subscribe(params => {
        // LEEMOS AMBOS PARÁMETROS
        const nombreEquipo = params.get('id'); 
        const categoria = params.get('categoria'); // <--- ESTO FALTABA EN TU ARCHIVO
        
        this.camisetas = [];
        this.error = '';

        if (categoria) {
           // ES UNA CATEGORÍA (Retro, NBA, etc)
           this.nombreEquipoActual = 'Camisetas ' + categoria.toUpperCase();
           this.cargarPorCategoria(categoria);
        } else if (nombreEquipo) {
           // ES UN EQUIPO
           this.nombreEquipoActual = nombreEquipo;
           this.cargarCamisetas(nombreEquipo);
        }
    });
  } 

  // Cargar por Equipo (Tu método original)
  cargarCamisetas(nombre: string) {
    this.camisetasService.getCamisetasPorEquipo(nombre).subscribe({
        next: (data) => {
          this.camisetas = data;
          if (data.length === 0) this.error = `No hay camisetas registradas para el ${nombre}`;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al conectar con el servidor';
        }
      });
  }

  // Cargar por Categoría (El método nuevo)
  cargarPorCategoria(categoria: string) {
    this.camisetasService.getCamisetasPorCategoria(categoria).subscribe({
        next: (data) => {
          this.camisetas = data;
          if (data.length === 0) this.error = `No hay camisetas de la categoría ${categoria}`;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al cargar las camisetas';
        }
      });
  }
}