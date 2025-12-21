import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion1',
  imports: [],
  templateUrl: './seccion1.html',
  styleUrl: './seccion1.css',
})
export class Seccion1 {
  camisetas = [
    {equipo: "FC Barcelona",descripcion:"1ª Equipación FC Barcelona 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1765387569/250997_1_sr4eoy.webp"},
    {equipo: "Real Madrid CF",descripcion:"1ª Equipación del Real Madrid CF 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766318143/250482_1_v2_tbfueq.webp"},
    {equipo: "Liverpool FC",descripcion:"1ª Equipación del Liverpool FC 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766319129/253449_1_tlfpnr.webp"},
    {equipo: "Arsenal FC",descripcion:"1ª Equipación del Arsenal FC 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766320024/252272_1_fj3c4n.webp"}
  ]
}
