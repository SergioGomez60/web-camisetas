import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ActivatedRoute } from '@angular/router'; // Aquí usaremos ActivatedRoute para capturar la descripcion que viene en la barra de direcciones
import { CamisetasService } from '../../services/camisetas';
import { Camiseta } from '../../services/camisetas';
import { CarritoService } from '../../services/carrito';


@Component({
  selector: 'app-camiseta',
  imports: [Header, Footer],
  templateUrl: './camiseta.html',
  styleUrl: './camiseta.css',
})
export class CamisetaComponent implements OnInit{
  camiseta: Camiseta | undefined;
  loading: boolean = true;
  informacion_camiseta: string = "Esta camiseta está fabricada con tejido deportivo de alta tecnología, diseñado para ofrecer la máxima comodidad y transpirabilidad. Su corte ergonómico se adapta perfectamente al cuerpo, permitiendo total libertad de movimiento tanto dentro como fuera del campo. Cuenta con acabados premium y detalles bordados que garantizan una gran durabilidad lavado tras lavado. Ideal para practicar deporte o para lucir un estilo casual deportivo.";

  constructor(private route:ActivatedRoute,private camisetasService: CamisetasService,private carritoService:CarritoService){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    if (id) {
      this.cargarCamiseta(id);
    }
  }

  cargarCamiseta(id: number) {
    this.loading = true; // Reiniciar loading al cambiar
    this.camisetasService.getCamisetaPorId(id).subscribe({
      next: (data) => {
        this.camiseta = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando la camiseta', err);
        this.loading = false;
      }
    });
  }

  agregarAlCarrito() {
    if (this.camiseta) {
      this.carritoService.agregarProducto(this.camiseta);
    }

}
}
