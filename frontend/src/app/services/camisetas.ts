import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CamisetasService {
  private apiUrl = 'http://localhost:3000/camisetas';

  constructor(private http:HttpClient){}

  getCamisetasPorEquipo(nombreEquipo:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/equipo/${nombreEquipo}`)
  }
}
