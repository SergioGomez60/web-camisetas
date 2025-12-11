// src/app/services/camisetas.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz de la camiseta para tipado seguro
export interface Camiseta {
  id: number;
  descripcion: string;
  precio: number;
  imagen_principal: string;
  nombre_equipo: string; // Campo que viene del JOIN del backend
  // ... otros campos
}

@Injectable({ providedIn: 'root' })
export class CamisetasService {
  private http = inject(HttpClient);
  // URL base de tu servidor Node.js (ajusta si es necesario)
  private apiUrl = 'http://localhost:3000/camisetas'; 

  /**
   * Obtiene camisetas filtradas por el nombre exacto del equipo.
   * @param nombreEquipo Ejemplo: 'Real Madrid'
   */
  getCamisetasPorEquipo(nombreEquipo: string): Observable<Camiseta[]> {
    // Es crucial codificar el nombre para que los espacios ('Real Madrid')
    // se manejen correctamente en la URL como 'Real%20Madrid'.
    const nombreCodificado = encodeURIComponent(nombreEquipo);
    
    // Llama a tu endpoint de Node.js: http://localhost:3000/camisetas/equipo/Real%20Madrid
    return this.http.get<Camiseta[]>(`${this.apiUrl}/${nombreCodificado}`);
  }

  
  getCamisetaPorDescripcion(descripcion: string) {
    // Configuras los parámetros
  const params = new HttpParams().set('descripcion', descripcion); // Para evitar errorees de espacios o simbolos usamos httparams.

  // Pasas las opciones como segundo argumento
  return this.http.get<Camiseta[]>(`${this.apiUrl}/camisetas`, { params });
  }
}