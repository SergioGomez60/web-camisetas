import { Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Seccion1 } from '../../components/seccion1/seccion1';
import { Seccion2 } from '../../components/seccion2/seccion2';
import { AuthService } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-inicio',
  imports: [Header,Seccion1,Seccion2],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit,OnDestroy {
  constructor(private authService: AuthService){}

  private destroy$ = new Subject<void>()

  isAuthenticated:boolean = false;

  // Sabemos si esta autenticado o no  SE PUEDE UTILIZAR EN CUALQUIER COMPONENTE 
  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete() // Cierra el Subject,Libera recursos,Evita futuras emisiones accidentales
  }
}
