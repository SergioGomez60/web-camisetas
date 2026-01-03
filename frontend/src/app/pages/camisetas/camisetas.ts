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
  // Añade otros campos si los necesitas mostrar
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
    // Escuchamos los cambios en la URL
    this.route.paramMap.pipe(
      takeUntilDestroyed() 
    ).subscribe(params => {
        // 1. Intentamos leer los dos posibles parámetros
        const equipo = params.get('id');           // Viene de /equipo/:id
        const categoria = params.get('categoria'); // Viene de /camisetas/:categoria
        
        this.camisetas = []; // Limpiamos la pantalla antes de cargar nada
        this.error = '';

        // 2. Decidimos qué cargar
        if (categoria) {
          // A. ES UNA CATEGORÍA (Ej: Retro)
          this.nombreEquipoActual = 'Camisetas ' + categoria.toUpperCase();
          this.cargarPorCategoria(categoria);

        } else if (equipo) {
          // B. ES UN EQUIPO (Ej: Madrid)
          this.nombreEquipoActual = equipo;
          this.cargarPorEquipo(equipo);
        }
    });
  } 

  // OPCIÓN A: Cargar por Categoría (NUEVO)
  cargarPorCategoria(categoria: string) {
    this.camisetasService.getCamisetasPorCategoria(categoria)
      .subscribe({
        next: (data) => {
          this.camisetas = data;
          if (data.length === 0) {
            this.error = `No hay camisetas de la categoría ${categoria}`;
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al cargar las camisetas';
        }
      });
  }

  // OPCIÓN B: Cargar por Equipo (EXISTENTE)
  cargarPorEquipo(nombre: string) {
    this.camisetasService.getCamisetasPorEquipo(nombre)
      .subscribe({
        next: (data) => {
          this.camisetas = data;
          if (data.length === 0) {
            this.error = `No hay camisetas registradas para el ${nombre}`;
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al conectar con el servidor';
        }
      });
  }
}