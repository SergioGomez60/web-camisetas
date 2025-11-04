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

interface Equipo{
  nombre:string
}

interface Liga {
  nombre: string;
  equipos: Equipo[];
  abierta?: boolean;
}

interface Seccion {
  nombre: string;
  ligas?: Liga[];
  abierta?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header{
  mostrarMenu = false;
  secciones:Seccion[] = [];

  constructor(){
    // Estructura del menú
    this.secciones = [
      {
        nombre: "Clubes 25/26",
        ligas: [
          {
            nombre:"LaLiga",
            equipos : [
              { nombre: 'FC Barcelona' },
              { nombre: 'Real Madrid' },
              { nombre: 'Atlético de Madrid' },
            ]
          },
          {
            nombre: 'Premier League',
            equipos: [
              { nombre: 'Arsenal FC' },
              { nombre: 'Liverpool FC' },
              { nombre: 'Manchester City FC' },
            ]
          }
        ]
      }
    ]
  }
 
}








