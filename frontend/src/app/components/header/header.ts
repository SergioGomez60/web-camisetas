import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router) {
    this.secciones = [
      {
        nombre: "Clubes 25/26",
        ligas: [
          { nombre: "LaLiga", equipos: [
            { nombre: 'FC Barcelona' },
            { nombre: 'Real Madrid' },
            { nombre: 'Villarreal CF' },
            { nombre: 'Atlético de Madrid' },
            { nombre: 'Real Betis' },
            { nombre: 'RCD Espanyol' },
            { nombre: 'Athletic Club' },
            { nombre: 'Getafe CF' },
            { nombre: 'Sevilla FC' },
            { nombre: 'Deportivo Alavés' },
            { nombre: 'Elche CF' },
            { nombre: 'Rayo Vallecano' },
            { nombre: 'Celta de Vigo' },
            { nombre: 'Real Sociedad' },
            { nombre: 'RCD Mallorca' },
            { nombre: 'CA Osasuna' },
            { nombre: 'Valencia CF' },
            { nombre: 'Girona FC' },
            { nombre: 'Levante UD' },
            { nombre: 'Real Oviedo' }
          ]},
          { nombre: "Premier League", equipos: [
            { nombre: 'Arsenal' },
            { nombre: 'Manchester City' },
            { nombre: 'Chelsea' },
            { nombre: 'Sunderland' },
            { nombre: 'Tottenham Hotspur' },
            { nombre: 'Aston Villa' },
            { nombre: 'Manchester United' },
            { nombre: 'Liverpool' },
            { nombre: 'Bournemouth' },
            { nombre: 'Crystal Palace' },
            { nombre: 'Brighton & Hove Albion' },
            { nombre: 'Brentford' },
            { nombre: 'Everton' },
            { nombre: 'Newcastle United' },
            { nombre: 'Fulham' },
            { nombre: 'Leeds United' },
            { nombre: 'Burnley' },
            { nombre: 'West Ham United' },
            { nombre: 'Nottingham Forest' },
            { nombre: 'Wolves' }

          ]},
          { nombre: "Serie A", equipos: [
            { nombre: 'Atalanta' },
            { nombre: 'Bologna' },
            { nombre: 'Cagliari' },
            { nombre: 'Como' },
            { nombre: 'Cremonese' },
            { nombre: 'Fiorentina' },
            { nombre: 'Genoa' },
            { nombre: 'Hellas Verona' },
            { nombre: 'Inter Milan' },
            { nombre: 'Juventus' },
            { nombre: 'Lazio' },
            { nombre: 'Lecce' },
            { nombre: 'AC Milan' },
            { nombre: 'Napoli' },
            { nombre: 'Parma' },
            { nombre: 'Pisa' },
            { nombre: 'Roma' },
            { nombre: 'Sassuolo' },
            { nombre: 'Torino' },
            { nombre: 'Udinese' }
          ]},
          { nombre: "Bundesliga", equipos: [
            { nombre: 'Bayern München' },
            { nombre: 'RB Leipzig' },
            { nombre: 'Borussia Dortmund' },
            { nombre: 'VfB Stuttgart' },
            { nombre: 'Bayer Leverkusen' },
            { nombre: 'TSG Hoffenheim' },
            { nombre: 'Eintracht Frankfurt' },
            { nombre: 'Werder Bremen' },
            { nombre: 'Köln' },
            { nombre: 'SC Freiburg' },
            { nombre: 'Union Berlin' },
            { nombre: 'Borussia Mönchengladbach' },
            { nombre: 'Hamburger SV' },
            { nombre: 'VfL Wolfsburg' },
            { nombre: 'FC Augsburg' },
            { nombre: 'FC St. Pauli' },
            { nombre: 'Mainz' },
            { nombre: 'Heidenheim' }
          ]},
          { nombre: "Ligue 1", equipos: [
            { nombre: 'Paris Saint-Germain' },
            { nombre: 'Marseille' },
            { nombre: 'RC Lens' },
            { nombre: 'Strasbourg' },
            { nombre: 'Lille' },
            { nombre: 'AS Monaco' },
            { nombre: 'Lyon' },
            { nombre: 'Rennes' },
            { nombre: 'Nice' },
            { nombre: 'Toulouse' },
            { nombre: 'Paris FC' },
            { nombre: 'Le Havre' },
            { nombre: 'Angers' },
            { nombre: 'Metz' },
            { nombre: 'Brest' },
            { nombre: 'Nantes' },
            { nombre: 'Lorient' },
            { nombre: 'Auxerre' }
          ]}
        ]
      },
      {
        nombre: "Selecciones 25/26",
        ligas: [
          { nombre: 'España', equipos:[] },
          { nombre: 'Argentina' , equipos:[] },
          { nombre: 'Francia' , equipos:[]},
          { nombre: 'Inglaterra' , equipos:[] },
          { nombre: 'Portugal' , equipos:[] },
          { nombre: 'Países Bajos' , equipos:[] },
          { nombre: 'Brasil' , equipos:[] },
          { nombre: 'Bélgica' , equipos:[] },
          { nombre: 'Croacia' , equipos:[] },
          { nombre: 'Italia' , equipos:[] }
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
      this.secciones.forEach(s => { if (s !== seccion) s.abierta = false; });
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

  paginaLogin(){
    this.router.navigate(["/login"]);
  }

 
}








