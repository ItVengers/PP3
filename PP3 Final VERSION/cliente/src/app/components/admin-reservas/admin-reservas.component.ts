
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as dayjs from 'dayjs';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-admin-reservas',
  templateUrl: './admin-reservas.component.html',
  styleUrls: ['./admin-reservas.component.css']
})

export class AdminReservasComponent implements OnInit {
  reserva: any = [];

  // dayjs(fecha)
  // revelar:boolean = true;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.reservasAdmin().subscribe(
      res => {
        this.reserva = res;
        console.log(res)
      },
      err => console.log(err)

    )
  }


  datosreservas(dato: any) {
    console.log(dato.idReserva);

    this.usuariosService.listarDatosReservas(dato.idReserva).subscribe(
      res => {
        let result: any
        result = res;
        console.log(result);
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
        this.router.navigate(['admin/datosreservas/:id'], navigationExtras);
      },
      err => console.log(err)

    )


  }
}

// const events = document.querySelectorAll('.event')
// events.forEach(event =>  {
//   const date = dayjs(event.dataset.date);
//   const dateElement = event.querySelector('.date')
//   dateElement.innerText = date;
// });
