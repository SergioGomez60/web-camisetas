import { Injectable,signal,computed} from '@angular/core';
import { Camiseta } from './camisetas';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  // Usamos una señal (Signal) para manejar la lista de productos
  // Esto hace que Angular actualice todo automáticamente cuando cambia el carrito
  private carritoSignal = signal<Camiseta[]>(this.recuperarCarrito());

  // Esta propiedad la usaremos para leer el carrito desde otros componentes
  carrito = this.carritoSignal.asReadonly();

  // Calculamos el total de productos automáticamente
  cantidad = computed(() => this.carritoSignal().length);

  // Precio total (se calcula solo sumando los precios)
  importeTotal = computed(() => {
    return this.carritoSignal().reduce((total, item) => total + item.precio, 0);
  });

  constructor(){}

  agregarProducto(producto: Camiseta) {
    // Añadimos el nuevo producto a la lista actual
    this.carritoSignal.update((productos) => [...productos, producto]);
    
    // Guardamos en el navegador para que no se pierda al recargar
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoSignal()));
  }

  private recuperarCarrito(): Camiseta[] {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  }

  eliminarProducto(index: number) {
    this.carritoSignal.update((productos) => {
      const nuevoCarrito = [...productos];
      nuevoCarrito.splice(index, 1); // Borra el elemento en esa posición
      return nuevoCarrito;
    });
    this.guardarEnLocalStorage();
  }
}
