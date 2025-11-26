import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Auth } from './components/auth/auth';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: "", component:Inicio },
    {path:"auth", component:Auth},
    {path:"**", redirectTo: "auth", pathMatch:"full"}
];

// canActivate:[authGuard]