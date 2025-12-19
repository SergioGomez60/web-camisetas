import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Caja, CajasService } from '../../services/cajas';

@Component({
  selector: 'app-cajas',
  imports: [Header,Footer],
  templateUrl: './cajas.html',
  styleUrl: './cajas.css',
})
export class Cajas implements OnInit{
  constructor(private cajasService:CajasService){}

  cajas: Caja[] = [];

  ngOnInit(): void {
    this.cargarCajas();
  }

  cargarCajas(){
    this.cajasService.getCajas().subscribe({
      next: (data) => {
        this.cajas = data;
      },
      error: (err) => {
        console.error('Error cargando cajas:', err);
      }
    })
  }
}
