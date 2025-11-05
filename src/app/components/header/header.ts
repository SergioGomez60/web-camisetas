/*import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  ngOnInit() {

    // MENU HAMBURGUESA
    const menu = document.querySelector<HTMLImageElement>(".hamburguesa");
    const secciones = document.querySelector(".secciones");

    menu?.addEventListener("click", () => {
      secciones?.classList.toggle("mostrar-secciones");

      if(secciones?.classList.contains("mostrar-secciones")){
        menu.src = "assets/x.png";
      }else{
        menu.src = "assets/menu-de-hamburguesas.png";
      }
    });

    // MOSTRAR SUBSECCIONES
  
    const seccion = document.querySelectorAll(".seccion");

    seccion.forEach(secc => {
      secc.addEventListener("click",()=>{
        const subsecciones = secc.querySelector(".subsecciones");
        const flecha = secc.querySelector(".flecha");
        if(subsecciones){
          subsecciones.classList.toggle("mostrar-subsecciones");
          flecha?.classList.toggle("rotar-flecha");
        }
      })
    });



    // MOSTRAR EQUIPOS
  
    const ligas = document.querySelectorAll(".liga");

    ligas.forEach(liga => {
      liga.addEventListener("click",(event)=>{
        event.stopPropagation(); // evita que el click burbujee hacia .subsecciones
        const equipos = liga.querySelector(".equipos");
        const flechaDerecha = liga.querySelector(".flecha-derecha");
        if(equipos){
          equipos.classList.toggle("mostrar-equipos");
          flechaDerecha?.classList.toggle("rotar-flecha270deg");
        }
      })
    });

  }
}*/




import { Component } from '@angular/core';

interface Equipo { nombre: string }
interface Liga { nombre: string; equipos: Equipo[]; abierta?: boolean; }
interface Seccion { nombre: string; ligas?: Liga[]; abierta?: boolean; }

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: []
})
export class Header {
  mostrarMenu = false;
  secciones: Seccion[] = [];
  mostrarBuscador = false;
  mostrarCarrito = false;

  constructor() {
    this.secciones = [
      {
        nombre: "Clubes 25/26",
        ligas: [
          { nombre: "LaLiga", equipos: [
            { nombre: 'FC Barcelona' },
            { nombre: 'Real Madrid' },
            { nombre: 'Atlético de Madrid' },
          ]},
          { nombre: "Premier League", equipos: [
            { nombre: 'Arsenal FC' },
            { nombre: 'Liverpool FC' },
            { nombre: 'Manchester City FC' },
          ]},
          { nombre: "Serie A", equipos: [
            { nombre: 'Inter Milán' },
            { nombre: 'Juventus' },
            { nombre: 'Roma' },
          ]}
        ]
      },
      {
        nombre: "Selecciones 25/26",
        ligas: [
          { nombre: 'España', equipos: [] },
          { nombre: 'Brasil', equipos: [] },
          { nombre: 'Argentina', equipos: [] }
        ]
      },
      { nombre: 'Camisetas Retro' },
      { nombre: 'Cajas Sorpresa' }
    ];
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
    this.mostrarBuscador = false 
    this.mostrarCarrito = false
  }


  toggleSeccion(seccion: Seccion) {
    this.secciones.forEach(s => {
      if (s !== seccion) s.abierta = false;
    });
    seccion.abierta = !seccion.abierta;
  }

  toggleLiga(seccion: Seccion, liga: Liga) {
    seccion.ligas?.forEach(l => {
      if (l !== liga) l.abierta = false;
    });
    liga.abierta = !liga.abierta;
  }

  toggleBuscador(){
    this.mostrarBuscador = !this.mostrarBuscador
    this.mostrarMenu = false 
    this.mostrarCarrito = false
  }

  toggleCarrito(){
    this.mostrarCarrito = !this.mostrarCarrito
    this.mostrarBuscador = false 
    this.mostrarMenu = false
  }

 
}








