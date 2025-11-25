import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit{
  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigate(["/inicio"])
      }
    })
  }

  login(){
    this.authService.loginWithRedirect()
  }
} 
