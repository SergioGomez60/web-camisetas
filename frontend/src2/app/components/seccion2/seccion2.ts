import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion2',
  imports: [],
  templateUrl: './seccion2.html',
  styleUrl: './seccion2.css',
})
export class Seccion2 {
  cajas = [
    {nombre: "Caja Low Cost", precio: 39.99, imagen:"assets/caja-lowcost.png"},
    {nombre: "Caja Standard", precio: 49.99, imagen:"assets/caja-standard.png"},
    {nombre: "Caja Premium", precio: 69.99, imagen:"assets/caja-premium.png"},
    {nombre: "Caja Retro", precio: 79.99, imagen:"assets/caja-retro.png"}
  ]
}
