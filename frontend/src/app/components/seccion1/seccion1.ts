import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seccion1',
  imports: [RouterLink],
  templateUrl: './seccion1.html',
  styleUrl: './seccion1.css',
})
export class Seccion1 {
  camisetas = [
    {id:1, equipo: "FC Barcelona",descripcion:"1° Equipacion FC Barcelona temporada 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1765387569/250997_1_sr4eoy.webp"},
    {id:5, equipo: "Real Madrid CF",descripcion:"1° Equipacion Real Madrid CF temporada 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766318143/250482_1_v2_tbfueq.webp"},
    {id:8,equipo: "Liverpool FC",descripcion:"1° Equipación del Liverpool FC temporada 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766319129/253449_1_tlfpnr.webp"},
    {id:11,equipo: "Arsenal FC",descripcion:"1° Equipación del Arsenal FC temporada 2025/2026",precio:89.99,imagen:"https://res.cloudinary.com/dgxtoqvte/image/upload/v1766320024/252272_1_fj3c4n.webp"}
  ]

  
}
