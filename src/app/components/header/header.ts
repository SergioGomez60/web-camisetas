import { Component, AfterViewInit, OnInit } from '@angular/core';

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
        menu.src = "assets/x.png"
      }else{
        menu.src = "assets/menu-de-hamburguesas.png"
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
  
    const subsecciones = document.querySelectorAll(".subsecciones");

    subsecciones.forEach(subseccion => {
      subseccion.addEventListener("click",()=>{
        const equipos = subseccion.querySelector(".equipos");
        const flechaDerecha = subseccion.querySelector(".flecha-derecha");
        if(equipos){
          equipos.classList.toggle("mostrar-equipos");
          flechaDerecha?.classList.toggle("rotar-flecha");
        }
      })
    });

  }
}

