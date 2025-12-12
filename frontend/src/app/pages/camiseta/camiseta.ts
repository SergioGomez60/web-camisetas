import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ActivatedRoute } from '@angular/router'; // Aquí usaremos ActivatedRoute para capturar la descripcion que viene en la barra de direcciones
import { CamisetasService } from '../../services/camisetas';
import { Camiseta } from '../../services/camisetas';


@Component({
  selector: 'app-camiseta',
  imports: [Header, Footer],
  templateUrl: './camiseta.html',
  styleUrl: './camiseta.css',
})
export class CamisetaComponent implements OnInit{
  camiseta: Camiseta | undefined;
  loading: boolean = true;

  constructor(private route:ActivatedRoute,private camisetasService: CamisetasService){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    if (id) {
      this.cargarCamiseta(id);
    }
  }

  cargarCamiseta(id:number){
    this.camisetasService.getCamisetaPorId(id).subscribe({
      next:(data) => {
        this.camiseta = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando la camiseta', err);
        this.loading = false;
      }
    });
  }

}
