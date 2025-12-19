import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { Caja, CajasService } from '../../services/cajas';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-caja',
  imports: [Header,Footer],
  templateUrl: './caja.html',
  styleUrl: './caja.css',
})
export class CajaInfo implements OnInit{

  constructor(private route:ActivatedRoute,private cajasService:CajasService,private carritoService:CarritoService){}

  caja: Caja | undefined;
  tallaSeleccionada: string = '';

  ngOnInit() {
    // Leemos el ID de la URL (ej: /caja/1)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cajasService.getCajaPorId(Number(id)).subscribe({
        next: (data) => this.caja = data,
        error: (err) => console.error('Error:', err)
      });
    }
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  agregarAlCarrito() {
    if (this.caja) {
        this.carritoService.agregarCaja(this.caja, this.tallaSeleccionada);
    }
  }
}
