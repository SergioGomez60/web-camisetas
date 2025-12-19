import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { Caja, CajasService } from '../../services/cajas';

@Component({
  selector: 'app-caja',
  imports: [Header,Footer],
  templateUrl: './caja.html',
  styleUrl: './caja.css',
})
export class CajaInfo implements OnInit{

  constructor(private route:ActivatedRoute,private cajasService:CajasService){}

  caja: Caja | undefined;

  ngOnInit() {
    // Leemos el ID de la URL (ej: /caja/1)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cajasService.getCajaPorId(Number(id)).subscribe({
        next: (data) => this.caja = data,
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
