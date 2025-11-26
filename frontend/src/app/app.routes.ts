import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: "", component:Inicio },
    {path:"**", redirectTo: "inicio", pathMatch:"full"} // Cuando el usuario entre a una ruta inexistente, Angular lo redirige automáticamente a auth.
                                                      // Indica que la coincidencia debe ser del path completo, no solo un prefijo.
];

// canActivate:[authGuard]