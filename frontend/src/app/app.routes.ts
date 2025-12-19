import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Camisetas } from './pages/camisetas/camisetas';
import { CamisetaComponent } from './pages/camiseta/camiseta';
import { Cajas } from './pages/cajas/cajas';
import { CajaInfo } from './pages/caja/caja';

export const routes: Routes = [
    {path: "", component:Inicio },
    {path:"equipo/:id", component:Camisetas},
    {path:"camiseta/:id/:equipacion", component:CamisetaComponent},
    {path: "cajas", component:Cajas},
    { path: 'caja/:id/:nombre', component: CajaInfo },
    {path:"**", redirectTo: "inicio", pathMatch:"full"}, // Cuando el usuario entre a una ruta inexistente, Angular lo redirige automáticamente a auth.
                                                         // Indica que la coincidencia debe ser del path completo, no solo un prefijo.
                                
];

