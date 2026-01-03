import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { CarritoService } from '../../services/carrito';


interface Equipo { nombre: string }
interface Liga { nombre: string; equipos: Equipo[]; abierta?: boolean; }
interface Seccion { nombre: string; ligas?: Liga[]; equipos?: Equipo[]; abierta?: boolean; }

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink,CommonModule]
})
export class Header{
  mostrarMenu = false;
  secciones: Seccion[] = [];
  mostrarBuscador = false;
  mostrarCarrito = false;
  isAuthenticated = signal(false);
  user = signal<User | null | undefined>(null);

  constructor(private router:Router, public authService:AuthService,public carritoService:CarritoService) {
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
            { nombre: 'Arsenal FC' },
            { nombre: 'Manchester City' },
            { nombre: 'Chelsea' },
            { nombre: 'Sunderland' },
            { nombre: 'Tottenham Hotspur' },
            { nombre: 'Aston Villa' },
            { nombre: 'Manchester United' },
            { nombre: 'Liverpool FC' },
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
        equipos: [
          { nombre: 'España' },
          { nombre: 'Argentina'  },
          { nombre: 'Francia' },
          { nombre: 'Inglaterra'  },
          { nombre: 'Portugal'  },
          { nombre: 'Países Bajos'  },
          { nombre: 'Brasil'  },
          { nombre: 'Bélgica'  },
          { nombre: 'Croacia'  },
          { nombre: 'Italia'  }
        ]
      },
      { nombre: 'Camisetas Retro' },
      { nombre: 'Cajas Sorpresa' }
    ];

    // 🔹 Suscripción a Auth0 para persistencia y actualización reactiva
    this.authService.isAuthenticated$.subscribe(value => {
      this.isAuthenticated.set(value);
    });

    this.authService.user$.subscribe(perfil => {
      this.user.set(perfil);
      console.log(perfil);
    });


  }  

// Nueva función para navegar y cerrar menús después de hacer clic en un equipo
navegarYcerrarMenu() {
  // 1. Cierra todos los menús desplegables
  this.mostrarMenu = false;
  this.mostrarBuscador = false;
  this.mostrarCarrito = false;

  // 2. Cierra las secciones y ligas abiertas (para resetear el estado del acordeón)
  this.secciones.forEach(seccion => {
    seccion.abierta = false;
    if (seccion.ligas) {
      seccion.ligas.forEach(liga => {
        liga.abierta = false;
      });
    }
  });

}


  login(){
    this.authService.loginWithRedirect()
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
    this.mostrarBuscador = false 
    this.mostrarCarrito = false
  }


  toggleSeccion(seccion: Seccion) {

    if ( seccion.nombre === 'Cajas Sorpresa') {
          this.router.navigate(['/cajas']); 
          this.navegarYcerrarMenu();        
          return;                           
      }

      if ( seccion.nombre === 'Camisetas Retro') {
          this.router.navigate(['/camisetas/retro']); 
          this.navegarYcerrarMenu();        
          return;                           
      }

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
    this.router.navigate(["/auth"]);
  }

  logout(){
    this.authService.logout({logoutParams: { returnTo: window.location.origin }});
  }


}








