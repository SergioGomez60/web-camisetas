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
  
  informacion_camiseta: string = '"Esta camiseta ha sido diseñada para ofrecer el máximo rendimiento tanto en el campo como en la grada. Fabricada con tejido técnico transpirable de última generación, garantiza una ventilación óptima y mantiene la piel seca en todo momento. Su corte ergonómico se adapta al cuerpo permitiendo una total libertad de movimiento, mientras que los acabados premium y el escudo bordado aseguran una durabilidad excepcional. La prenda definitiva para lucir tus colores con orgullo y comodidad."';

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