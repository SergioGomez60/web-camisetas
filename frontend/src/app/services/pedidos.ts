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

  obtenerPedidosPorUsuario(email: string): Observable<any[]> {
    // Aquí asumimos que tu backend recibe el email como parámetro en la URL
    // Ejemplo: http://localhost:3000/pedidos/usuario/sergio@gmail.com
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${email}`);
  }
}
