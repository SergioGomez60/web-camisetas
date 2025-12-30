import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-seccion2',
  imports: [RouterLink],
  templateUrl: './seccion2.html',
  styleUrl: './seccion2.css',
})
export class Seccion2 {
  cajas = [
    {id:1, nombre: "Caja Low Cost", precio: 39.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123589/caja-lowcost_qjvddn.png"},
    {id:2, nombre: "Caja Standard", precio: 49.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123588/caja-standard_cbyv1j.png"},
    {id:3, nombre: "Caja Premium", precio: 69.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123590/caja-premium_lg4lb9.png"},
    {id:4, nombre: "Caja Retro", precio: 79.99, imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766123589/caja-retro_lzjmxm.png"}
  ]

  
}
