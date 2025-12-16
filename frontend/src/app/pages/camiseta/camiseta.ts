import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ActivatedRoute } from '@angular/router';
import { CamisetasService } from '../../services/camisetas';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-camiseta',
  standalone: true,
  imports: [Header, Footer, CommonModule], 
  templateUrl: './camiseta.html',
  styleUrl: './camiseta.css',
})
export class CamisetaComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private camisetasService = inject(CamisetasService);
  private carritoService = inject(CarritoService);

  camiseta: any | undefined;
  loading: boolean = true;
  tallaSeleccionada: string = ''; // <--- Variable nueva
  
  informacion_camiseta: string = "Esta camiseta está fabricada con tejido deportivo...";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (id) this.cargarCamiseta(id);
    });
  }

  cargarCamiseta(id: number) {
    this.loading = true;
    this.tallaSeleccionada = ''; 
    this.camisetasService.getCamisetaPorId(id).subscribe({
      next: (data) => {
        this.camiseta = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  agregarAlCarrito() {
    if (this.camiseta) {
      if (!this.tallaSeleccionada) {
         alert("⚠️ Selecciona una talla antes de añadir.");
         return;
      }
      // ENVIAMOS PRODUCTO Y TALLA
      this.carritoService.agregarProducto(this.camiseta, this.tallaSeleccionada);
    }
  }
}