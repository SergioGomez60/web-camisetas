import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private http = inject(HttpClient);
  // Asegúrate de que esta URL coincida con tu backend
  private apiUrl = 'http://localhost:3000/pedidos'; 

  crearPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
}
