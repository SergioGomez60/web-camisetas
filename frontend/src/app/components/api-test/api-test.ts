import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-api-test',
  standalone: true,
  templateUrl: './api-test.html'
})
export class ApiTestComponent {

  respuesta: any = null;

  constructor(private http: HttpClient, private auth: AuthService) {}

  llamarApiProtegida() {
    this.auth.getAccessTokenSilently().subscribe(token => {

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get('http://localhost:3000/api/protegido', { headers })
        .subscribe(resp => {
          this.respuesta = resp;
        });

    });
  }
}
