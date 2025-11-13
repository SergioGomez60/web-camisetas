import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion1',
  imports: [],
  templateUrl: './seccion1.html',
  styleUrl: './seccion1.css',
})
export class Seccion1 {
  camisetas = [
    {equipo: "FC Barcelona",descripcion:"Camiseta del FC Barcelona 2025/2026",precio:89.99,imagen:"assets/barcelona.jpg"},
    {equipo: "Real Madrid",descripcion:"Camiseta del Real Madrid 2025/2026",precio:89.99,imagen:"assets/madrid.jpg"},
    {equipo: "Liverpool FC",descripcion:"Camiseta del Liverpool FC 2025/2026",precio:89.99,imagen:"assets/liverpool.jpg"},
    {equipo: "Arsenal",descripcion:"Camiseta del Arsenal 2025/2026",precio:89.99,imagen:"assets/arsenal.jpg"}
  ]
}
