import { Component,signal } from '@angular/core';
import { AuthService,provideAuth0 } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-autenticacion',
  imports: [AsyncPipe],
  providers: [
    provideAuth0({
      domain: 'dev-32mzzfaff4uprtnv.us.auth0.com',
      clientId: 'T7ZO8gLy6JiD0DMT0zOGMkeIxLf5nGtf',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  templateUrl: './autenticacion.html',
  styleUrl: './autenticacion.css',
})
export class Autenticacion {
  // Señales para manejar estado de autenticación
  isAuthenticated = signal(false);
  user: any = signal(null);

  constructor(private auth: AuthService) {
    // Suscribimos los observables de Auth0 a señales
    this.auth.isAuthenticated$.subscribe(val => this.isAuthenticated.set(val));
    this.auth.user$.subscribe(user => this.user.set(user));
  }

  // Login normal
  login() {
    this.auth.loginWithRedirect();
  }

  // Abrir signup de Auth0
  register() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
}


  // Logout actualizado según la última versión del SDK
  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
