
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as dayjs from 'dayjs';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-admin-reservas',
  templateUrl: './admin-reservas.component.html',
  styleUrls: ['./admin-reservas.component.css']
})

export class AdminReservasComponent implements OnInit {
  reserva: any = [];
  selectedHot: string = 'Hotel Cordoba';
  hoteles: any = [];
  nro_hotel = 0;

  // dayjs(fecha)
  // revelar:boolean = true;

  constructor(private usuariosService: UsuariosService, private router: Router, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {

    if (this.nro_hotel == 0) {
      this.traerHoteles();
      if (this.selectedHot == 'Hotel Cordoba') {
        this.nro_hotel = 1;
      }
      if (this.selectedHot == 'Holiday Inn Cordoba') {
        this.nro_hotel = 2;
      }
      if (this.selectedHot == 'Howard Johnson La Cañada Hotel & Suites') {
        this.nro_hotel = 3;
      }
      if (this.selectedHot == 'NH Córdoba Urbano') {
        this.nro_hotel = 4;
      }
    }
    else {
      if (this.selectedHot == 'Hotel Cordoba') {
        this.nro_hotel = 1;
      }
      if (this.selectedHot == 'Holiday Inn Cordoba') {
        this.nro_hotel = 2;
      }
      if (this.selectedHot == 'Howard Johnson La Cañada Hotel & Suites') {
        this.nro_hotel = 3;
      }
      if (this.selectedHot == 'NH Córdoba Urbano') {
        this.nro_hotel = 4;
      }
    }

    this.usuariosService.reservasAdmin(this.nro_hotel).subscribe(
      res => {
        this.reserva = res;
        console.log(res)
      },
      err => console.log(err)

    )
  }

  selectChangeHandler(event: any) {
    this.selectedHot = event.target.value;
    this.ngOnInit();
  }

  traerHoteles() {
    this.usuariosService.listarHoteles().subscribe(
      (res) => {
        this.hoteles = res;
        console.log(this.hoteles);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.statusText,
          detail: err.error.message,
        });
        console.log(err.error.message);
      }
    )
  }


  datosreservas(dato: any) {
    console.log(dato.idReserva);

    this.usuariosService.listarDatosReservas(dato.idReserva).subscribe(
      res => {
        let result: any
        result = res;
        const navigationExtras: NavigationExtras = {
          state: {
            idReserva: result.idReserva,
            fechaDesde: result.fechaDesde,
            fechaHasta: result.fechaHasta,
            fechaReserva: result.fechaReserva,
            habitacion_id: result.habitacion_id,
            cantidadPax: result.cantidadPax,
            persona_id: result.persona_id,
            precioTotal: result.precioTotal
          }
        }
        console.log(navigationExtras);
        this.router.navigate(['../datosreserva/' + result.idReserva], navigationExtras);
      },
      err => console.log(err)

    )


  }
  goBack() {
    this.location.back();
  }
}

// const events = document.querySelectorAll('.event')
// events.forEach(event =>  {
//   const date = dayjs(event.dataset.date);
//   const dateElement = event.querySelector('.date')
//   dateElement.innerText = date;
// });
