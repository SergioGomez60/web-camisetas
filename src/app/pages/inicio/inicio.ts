import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Seccion1 } from '../../components/seccion1/seccion1';

@Component({
  selector: 'app-inicio',
  imports: [Header,Seccion1],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
