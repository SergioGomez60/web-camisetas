import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Caja {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})

export class CajasService {
  constructor(private http:HttpClient){}

  private apiUrl = 'http://localhost:3000/cajas';

  getCajas(): Observable<Caja[]>{
    return this.http.get<Caja[]>(this.apiUrl);
  }
}
