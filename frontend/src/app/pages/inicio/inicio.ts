import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Seccion1 } from '../../components/seccion1/seccion1';
import { Seccion2 } from '../../components/seccion2/seccion2';


@Component({
  selector: 'app-inicio',
  imports: [Header,Seccion1,Seccion2],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
