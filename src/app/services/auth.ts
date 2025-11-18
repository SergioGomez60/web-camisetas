import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Ajusta la URL a tu backend
  private apiUrl = 'http://localhost:3000/usuarios';

  user = signal<User | null>(null); // Los componentes que lean el signal se actualizarán automáticamente cuando su valor cambie.

  constructor(private http: HttpClient){}

  login(data: { email: string; password: string }){
    return this.http.post(`${this.apiUrl}/login`,data);
  }

  registro(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  setUser(userData: any) {
    this.user.set(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('user');
  }
}
