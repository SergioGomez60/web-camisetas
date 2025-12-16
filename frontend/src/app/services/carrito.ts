import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Camiseta } from './camisetas';

// Interfaz que extiende Camiseta añadiendo el ID del carrito y la Talla
export interface ItemCarrito extends Camiseta {
  carrito_id: number; 
  talla: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:3000/carrito';

  // Señal principal
  private carritoSignal = signal<ItemCarrito[]>([]);
  
  // Variables públicas
  carrito = this.carritoSignal.asReadonly();
  cantidad = computed(() => this.carritoSignal().length);
  importeTotal = computed(() => this.carritoSignal().reduce((acc, item) => acc + Number(item.precio), 0));

  private usuarioId: string | undefined;

  constructor() {
    // Detecta automáticamente si el usuario entra o sale
    effect(() => {
        this.auth.user$.subscribe(user => {
            if (user?.sub) {
                this.usuarioId = user.sub; 
                this.cargarCarrito();      
            } else {
                this.usuarioId = undefined;
                this.carritoSignal.set([]); 
            }
        });
    });
  }

  cargarCarrito() {
    if (!this.usuarioId) return;
    this.http.get<ItemCarrito[]>(`${this.apiUrl}/${this.usuarioId}`).subscribe({
        next: (items) => this.carritoSignal.set(items),
        error: (err) => console.error("Error cargando carrito:", err)
    });
  }

  // AHORA PIDE DOS COSAS: CAMISETA Y TALLA
  agregarProducto(camiseta: Camiseta, talla: string) {
    if (!this.usuarioId) {
        alert("🔒 Inicia sesión para comprar");
        this.auth.loginWithRedirect();
        return;
    }

    if (!talla) {
        alert("⚠️ Por favor, selecciona una talla.");
        return;
    }

    this.http.post(this.apiUrl, { 
        usuario_id: this.usuarioId, 
        camiseta_id: camiseta.id,
        talla: talla 
    }).subscribe({
        next: () => {
            this.cargarCarrito();
            alert(`✅ Añadida talla ${talla} al carrito`);
        },
        error: (err) => console.error("Error añadiendo:", err)
    });
  }

  eliminarProducto(index: number) { 
    const item = this.carritoSignal()[index];
    if(!item) return;

    this.http.delete(`${this.apiUrl}/${item.carrito_id}`).subscribe({
        next: () => {
            this.cargarCarrito(); 
        },
        error: (err) => console.error("Error borrando:", err)
    });
  }
}