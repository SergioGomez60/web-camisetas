import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Camisetas } from './pages/camisetas/camisetas';
import { Camiseta } from './pages/camiseta/camiseta';

export const routes: Routes = [
    {path: "", component:Inicio },
    {path:"equipo/:id", component:Camisetas},
    {path:"camiseta/:equipacion", component:Camiseta},
    {path:"**", redirectTo: "inicio", pathMatch:"full"}, // Cuando el usuario entre a una ruta inexistente, Angular lo redirige automáticamente a auth.
                                                         // Indica que la coincidencia debe ser del path completo, no solo un prefijo.
                                
];

