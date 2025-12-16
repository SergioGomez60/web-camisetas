// frontend/src/app/services/carrito.ts
import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Camiseta } from './camisetas';

// Creamos una interfaz que extiende Camiseta pero añade el ID del carrito
export interface ItemCarrito extends Camiseta {
  carrito_id: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:3000/carrito';

  // Señal principal (ahora empieza vacía, no lee localStorage)
  private carritoSignal = signal<ItemCarrito[]>([]);
  
  // Variables públicas (se calculan solas)
  carrito = this.carritoSignal.asReadonly();
  cantidad = computed(() => this.carritoSignal().length);
  importeTotal = computed(() => this.carritoSignal().reduce((acc, item) => acc + Number(item.precio), 0));

  // ID del usuario logueado
  private usuarioId: string | undefined;

  constructor() {
    // ESTO ES MAGIA: Cada vez que el usuario hace login/logout, esto se ejecuta solo
    effect(() => {
        this.auth.user$.subscribe(user => {
            if (user?.sub) {
                // Si hay usuario, guardamos su ID y cargamos SU carrito
                this.usuarioId = user.sub; 
                this.cargarCarrito();      
            } else {
                // Si hace logout, vaciamos todo
                this.usuarioId = undefined;
                this.carritoSignal.set([]); 
            }
        });
    });
  }

  // Cargar datos desde la BD
  cargarCarrito() {
    if (!this.usuarioId) return;

    this.http.get<ItemCarrito[]>(`${this.apiUrl}/${this.usuarioId}`).subscribe({
        next: (items) => this.carritoSignal.set(items),
        error: (err) => console.error("Error cargando carrito:", err)
    });
  }

  // Añadir a la BD
  agregarProducto(camiseta: Camiseta, talla: string) {
    if (!this.usuarioId) {
        alert("🔒 Inicia sesión para comprar");
        this.auth.loginWithRedirect();
        return;
    }

    if (!talla) {
        alert("⚠️ Por favor, selecciona una talla antes de añadir.");
        return;
    }

    this.http.post(this.apiUrl, { 
        usuario_id: this.usuarioId, 
        camiseta_id: camiseta.id,
        talla: talla // <--- ENVIAMOS LA TALLA
    }).subscribe({
        next: () => {
            this.cargarCarrito();
            alert(`¡Añadida talla ${talla} al carrito!`);
        },
        error: (err) => console.error("Error añadiendo:", err)
    });
}

  // Eliminar de la BD
  eliminarProducto(index: number) { 
    // Buscamos el item en nuestra lista actual para saber su ID de base de datos
    const item = this.carritoSignal()[index];

    if(!item) return;

    this.http.delete(`${this.apiUrl}/${item.carrito_id}`).subscribe({
        next: () => {
            this.cargarCarrito(); // Recargamos tras borrar
        },
        error: (err) => console.error("Error borrando:", err)
    });
  }
}
