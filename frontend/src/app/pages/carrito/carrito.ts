import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { CarritoService } from '../../services/carrito';
import { PedidosService } from '../../services/pedidos';

// IMPORTS DE STRIPE
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [Header, Footer, CommonModule, FormsModule, StripeCardComponent], // <--- Importante
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoPage {
  carritoService = inject(CarritoService);
  pedidosService = inject(PedidosService);
  auth = inject(AuthService);
  router = inject(Router);
  stripeService = inject(StripeService);
  http = inject(HttpClient);

  // Configuración de la tarjeta Stripe
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': { color: '#CFD7E0' }
      }
    }
  };
  
  elementsOptions: StripeElementsOptions = { locale: 'es' };

  datosEnvio = {
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    pais: ''
  };

  procesando = false;

  async comprar() {
    const total = this.carritoService.importeTotal();
    if (total === 0) return;

    if (!this.datosEnvio.direccion || !this.datosEnvio.ciudad || !this.datosEnvio.pais) {
      alert('⚠️ Por favor, rellena todos los datos de envío.');
      return;
    }

    this.procesando = true;

    // 1. Pedir al backend que prepare el cobro
    this.http.post<any>('http://localhost:3000/pagos/crear-intencion', { importe: total * 100 })
      .subscribe({
        next: (res) => {
          
          // 2. Confirmar el pago con la tarjeta introducida
          this.stripeService.confirmCardPayment(res.clientSecret, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: 'Cliente Web',
                address: {
                  line1: this.datosEnvio.direccion,
                  city: this.datosEnvio.ciudad,
                  postal_code: this.datosEnvio.codigo_postal,
                  country: 'ES' // Puedes hacerlo dinámico si quieres
                }
              }
            }
          }).subscribe((result) => {
            if (result.error) {
              // Error (tarjeta rechazada, etc.)
              alert(result.error.message);
              this.procesando = false;
            } else {
              // 3. Pago Éxitoso -> Guardamos el pedido
              if (result.paymentIntent.status === 'succeeded') {
                this.guardarPedido();
              }
            }
          });

        },
        error: (err) => {
          console.error(err);
          alert('❌ Error de conexión con el servidor de pagos');
          this.procesando = false;
        }
      });
  }

  guardarPedido() {
    this.auth.user$.subscribe(user => {
      const pedido = {
        usuario_id: user?.sub || 'invitado', // Usa el ID del usuario logueado
        total: this.carritoService.importeTotal(),
        ...this.datosEnvio
      };

      this.pedidosService.crearPedido(pedido).subscribe({
        next: (res) => {
            alert('✅ ¡Pago realizado con éxito!');
            this.carritoService.cargarCarrito(); 
            this.router.navigate(['/']); 
        },
        error: (err) => {
            console.error(err);
            alert('El pago se cobró pero hubo un error guardando el pedido. Contáctanos.');
        }
      });
    });
  }
}