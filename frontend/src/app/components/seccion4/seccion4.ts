import { Component } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';


SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-seccion4',
  standalone: true,
  imports: [SwiperModule],
  templateUrl: './seccion4.html',
  styleUrl: './seccion4.css',
})
export class Seccion4 {
  
}
