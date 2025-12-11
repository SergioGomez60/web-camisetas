import { Component, Injector, OnInit, inject, runInInjectionContext } from '@angular/core'; // Añadimos 'inject'
import { CamisetasService } from '../../services/camisetas';
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // ⬅️ Nuevo para limpieza de memoria
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
export class Camisetas{
  // Usamos 'inject' para obtener dependencias de forma moderna
  private route = inject(ActivatedRoute); 
  private camisetasService = inject(CamisetasService);
  
  camisetas: Camiseta[] = [];
  error: string = '';
  nombreEquipoActual: string = '';

  // El constructor ya no necesita recibir inyecciones, podemos usar `inject()` arriba.
  constructor(private injector:Injector) {
   // 🔑 Lógica CORREGIDA: Esto es lo que debe ir dentro de la suscripción
    this.route.paramMap.pipe(
      takeUntilDestroyed() 
    ).subscribe(params => {
        const nombreEquipo = params.get('id'); // 'id' debe coincidir con la ruta en app.routes.ts
        
        if (nombreEquipo) {
          this.nombreEquipoActual = nombreEquipo;
          this.cargarCamisetas(nombreEquipo); // ⬅️ ¡ESTO FALTABA!
        }
    });
} 


  cargarCamisetas(nombre: string) {
    this.error = '';
    this.camisetas = []; // Limpiamos antes de cargar

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

