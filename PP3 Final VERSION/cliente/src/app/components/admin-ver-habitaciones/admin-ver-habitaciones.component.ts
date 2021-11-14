import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-ver-habitaciones',
  templateUrl: './admin-ver-habitaciones.component.html',
  styleUrls: ['./admin-ver-habitaciones.component.css']
})
export class AdminVerHabitacionesComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router, private location: Location) { }

  habitaciones: any = [];
  reservaID: any = 0;


  ngOnInit(): void {

    this.usuariosService.vistaDeHabitaciones().subscribe(
      res => {
        this.habitaciones = res;
        console.log(res)
      },
      err => console.log(err)
    )

  }

  cambiarEstado(id: number, nroHab: number, ingreso: string, egreso: string) {

    switch (id) {
      case 1:
        this.usuariosService.bloquearHabitacion(nroHab).subscribe(
          res => {
            this.habitaciones = res;
            console.log(res);

            this.ngOnInit();
          },
          err => console.log(err)
        )

        // statement 1
        break;
      case 2:

          let datos = {habNo: nroHab,fechain: ingreso, fechaE: egreso}

        this.usuariosService.conseguirReserva(datos).subscribe(
          res => {
            this.reservaID = res;
            console.log(res);
          },
          err => console.log(err)
        )

        this.usuariosService.cancelarReserva(this.reservaID).subscribe(
          res => {
            this.habitaciones = res;
            console.log(res)
          },
          err => console.log(err)
        )
        // statement 2
        break;
      case 6:
        this.usuariosService.habilitarHabitacion(nroHab).subscribe(
          res => {
            this.habitaciones = res;
            console.log(res);

            this.ngOnInit();
          },
          err => console.log(err)
        )
        // statement N
        break;
      default:
        //
        break;
    }





  }

  goBack() {
    this.location.back();
  }

}
