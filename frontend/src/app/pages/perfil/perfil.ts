import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { AuthService, User } from '@auth0/auth0-angular';
import { PedidosService } from '../../services/pedidos';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [Header,Footer,DatePipe,CurrencyPipe],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  opcionSeleccionada: string = "Perfil";
  user = signal<User | null | undefined>(null);
  pedidos = signal<any[]>([]);

  constructor(private authService:AuthService,private pedidosService:PedidosService){
    this.authService.user$.subscribe(perfil => {
      this.user.set(perfil);
      console.log(perfil);

      if (perfil && perfil.sub) {
        this.cargarPedidos(perfil.sub); // sub = ID
      }

    });
  }

  cargarPedidos(id: string) {
    this.pedidosService.obtenerPedidosPorUsuario(id).subscribe({
      next: (datos) => {
        this.pedidos.set(datos); // Guardamos los pedidos en la señal
        console.log('Pedidos recuperados:', datos);
      },
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }

  seleccionar(opcion:string): void{
    this.opcionSeleccionada = opcion;
  }

  
}
