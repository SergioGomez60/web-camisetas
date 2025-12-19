import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion2',
  imports: [],
  templateUrl: './seccion2.html',
  styleUrl: './seccion2.css',
})
export class Seccion2 {
  cajas = [
    {nombre: "Caja Low Cost", precio: 39.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123589/caja-lowcost_qjvddn.png"},
    {nombre: "Caja Standard", precio: 49.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123588/caja-standard_cbyv1j.png"},
    {nombre: "Caja Premium", precio: 69.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123590/caja-premium_lg4lb9.png"},
    {nombre: "Caja Retro", precio: 79.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123589/caja-retro_lzjmxm.png"}
  ]

  
}
