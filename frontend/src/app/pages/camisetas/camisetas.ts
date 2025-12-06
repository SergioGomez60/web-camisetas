import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CamisetasService } from '../../services/camisetas';


@Component({
  selector: 'app-camisetas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './camisetas.html'
})
export class Camisetas {

  equipoControl = new FormControl('');
  camisetas: any[] = [];
  error: string = '';

  constructor(private camisetasService: CamisetasService) {}

  buscar() {
    const nombreEquipo = this.equipoControl.value?.trim() || '';

    if (!nombreEquipo) {
      this.error = 'Introduce un nombre de equipo';
      return;
    }

    this.error = '';
    this.camisetas = [];

    this.camisetasService.getCamisetasPorEquipo(nombreEquipo)
      .subscribe({
        next: data => this.camisetas = data,
        error: () => this.error = 'No se encontraron camisetas'
      });
  }
}

