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

  obtenerPedidosPorUsuario(id: string): Observable<any[]> {
    // Enviamos directamente a /pedidos/:id
    // Nota: encodeURIComponent es bueno por si el ID de auth0 tiene caracteres raros
    return this.http.get<any[]>(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }
}
