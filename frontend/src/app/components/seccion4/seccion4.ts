import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';



@Component({
  selector: 'app-seccion4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion4.html',
  styleUrl: './seccion4.css',
})
export class Seccion4 implements AfterViewInit {

   slides = [
    { img: '/assets/logo-camis.png', opinion: '“¡La camiseta llegó rápido y la calidad es excelente! Muy recomendable.”', estrellas: '⭐⭐⭐⭐⭐',nombre:"Sergio.G" },
    { img: '/assets/logo-camis.png', opinion: '“Gran variedad de equipos y tallas perfectas. Sin duda volveré a comprar.”', estrellas: '⭐⭐⭐⭐⭐',nombre:"David.P" },
    { img: '/assets/logo-camis.png', opinion: '“Me encanta el diseño y los detalles. La tela es cómoda y resistente.”', estrellas: '⭐⭐⭐⭐⭐',nombre:"Miguel.F" },
    { img: '/assets/logo-camis.png', opinion: '“Compra fácil y envío rápido. La camiseta se ve igual que en la foto.”', estrellas: '⭐⭐⭐⭐⭐',nombre:"Jesus.H" },
  ];

    ngAfterViewInit(): void {
      new Swiper('.mySwiper', {
        modules: [Navigation, Pagination, EffectCoverflow],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: { clickable: true },
      });
  }
}
