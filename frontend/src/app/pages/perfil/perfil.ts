import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-perfil',
  imports: [Header,Footer],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  opcionSeleccionada: string = "Perfil";
  user = signal<User | null | undefined>(null);

  constructor(private authService:AuthService){
    this.authService.user$.subscribe(perfil => {
      this.user.set(perfil);
      console.log(perfil);
    });
  }

  seleccionar(opcion:string): void{
    this.opcionSeleccionada = opcion;
  }

  
}
