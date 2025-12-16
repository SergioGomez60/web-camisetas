import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. IMPORTANTE: Para usar ngClass en el HTML
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ActivatedRoute } from '@angular/router'; 
import { CamisetasService, Camiseta } from '../../services/camisetas';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-camiseta',
  standalone: true,
  imports: [Header, Footer, CommonModule], // <--- Añado CommonModule aquí
  templateUrl: './camiseta.html',
  styleUrl: './camiseta.css',
})
export class CamisetaComponent implements OnInit {
  
  // Usamos 'any' en lugar de 'Camiseta' para que no dé error al leer la propiedad 'tallas' que viene de la BD
  camiseta: any | undefined; 
  
  loading: boolean = true;
  tallaSeleccionada: string = ''; // <--- 2. Variable para guardar la talla elegida

  informacion_camiseta: string = "Esta camiseta está fabricada con tejido deportivo de alta tecnología, diseñado para ofrecer la máxima comodidad y transpirabilidad. Su corte ergonómico se adapta perfectamente al cuerpo, permitiendo total libertad de movimiento tanto dentro como fuera del campo. Cuenta con acabados premium y detalles bordados que garantizan una gran durabilidad lavado tras lavado. Ideal para practicar deporte o para lucir un estilo casual deportivo.";

  constructor(
    private route: ActivatedRoute,
    private camisetasService: CamisetasService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Usamos paramMap correctamente para detectar cambios si el usuario navega
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (id) {
        this.cargarCamiseta(id);
      }
    });
  }

  cargarCamiseta(id: number) {
    this.loading = true;
    this.tallaSeleccionada = ''; // Reiniciamos la talla al cargar nueva camiseta
    
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

  // <--- 3. Función para marcar la talla
  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  // <--- 4. Función actualizada para enviar la talla
  agregarAlCarrito() {
    if (this.camiseta) {
      // Validación: Si no ha elegido talla, paramos
      if (!this.tallaSeleccionada) {
         alert("⚠️ Por favor, selecciona una talla antes de añadir.");
         return;
      }

      // Enviamos la camiseta Y la talla seleccionada
      this.carritoService.agregarProducto(this.camiseta, this.tallaSeleccionada);
    }
  }
}