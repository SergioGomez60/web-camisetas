import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Seccion1 } from '../../components/seccion1/seccion1';
import { Seccion2 } from '../../components/seccion2/seccion2';
import { AuthService } from '@auth0/auth0-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Seccion3 } from '../../components/seccion3/seccion3';
import { Seccion4 } from '../../components/seccion4/seccion4';
import { Footer } from '../../components/footer/footer';



@Component({
  selector: 'app-inicio',
  imports: [Header,Seccion1,Seccion2,Seccion3,Seccion4,Footer],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit{
  constructor(private authService: AuthService, private destroyRef: DestroyRef){}

  isAuthenticated:boolean = false;

  // Sabemos si esta autenticado o no  SE PUEDE UTILIZAR EN CUALQUIER COMPONENTE 
  ngOnInit(): void {
    this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => console.log(user));
  }

  
}
