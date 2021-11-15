import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-ver-habitaciones',
  templateUrl: './admin-ver-habitaciones.component.html',
  styleUrls: ['./admin-ver-habitaciones.component.css'],
  providers: [MessageService]
})
export class AdminVerHabitacionesComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private messageService: MessageService, private router: Router, private location: Location) { }

  habitaciones: any = [];
  reservaID: any = 0;
  datosBloquear = { nroHabitacion: "", nroHot: "" };
  selectedHot: string = 'Hotel Cordoba';
  hoteles: any = [];
  nro_hotel = 1;

  ngOnInit(): void {
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

    this.usuariosService.vistaDeHabitaciones(this.nro_hotel).subscribe(
      res => {
        this.habitaciones = res;
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

  cambiarEstado(id: number, nroHab: number, ingreso: string, egreso: string, nroHotel: string) {

    switch (id) {
      case 1:
        this.datosBloquear.nroHabitacion = nroHab.toString();
        this.datosBloquear.nroHot = nroHotel;
        this.usuariosService.bloquearHabitacion(this.datosBloquear).subscribe(
          res => {
            this.habitaciones = res;
            console.log(res);
            this.ngOnInit();

            this.messageService.add({
              severity: 'success',
              summary: 'Habitacion Bloqueada',
            });
          },
          (err) => {
            console.log(err.error.message);
          }
        )

        // statement 1
        break;
      case 2:

        let fechaI = ingreso.substring(0, 10);
        let fechaE = egreso.substring(0, 10);



        let datos = { habNo: nroHab, fechain: fechaI, fechaE: fechaE }

        this.usuariosService.conseguirReserva(datos).subscribe(
          res => {
            let result: any = res;
            result = result.idReserva;
            console.log(result.idReserva);
            this.reservaID = res;
            console.log(res);

            this.usuariosService.cancelarReserva(result).subscribe(
              res => {
                this.habitaciones = res;
                console.log(res);
                this.ngOnInit();

                this.messageService.add({
                  severity: 'success',
                  summary: 'RESERVA CANCELADA',
                });
              },
              err => console.log(err)
            )
          },
          err => console.log(err)
        )

        // this.usuariosService.cancelarReserva(this.reservaID).subscribe(
        //   res => {
        //     this.habitaciones = res;
        //     console.log(res);

        //     this.ngOnInit();
        //   },
        //   err => console.log(err)
        // )
        // statement 2
        break;
      case 6:

        this.datosBloquear.nroHabitacion = nroHab.toString();
        this.datosBloquear.nroHot = nroHotel;
        this.usuariosService.habilitarHabitacion(this.datosBloquear).subscribe(
          res => {
            this.habitaciones = res;
            console.log(res);

            this.ngOnInit();

            this.messageService.add({
              severity: 'success',
              summary: 'Habitacion Desbloqueada',
            });
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



  // this.usuariosService.crearActa(this.acta).subscribe(
  //   res => {
  //     const result:any = res;
  //     for(var i =0; i < this.notasTotales.length;i++){
  //       this.notasTotales[i].idacta =  result.id;
  //     }
  //     this.usuariosService.agregarNotas(this.notasTotales,this.acta.tipo).subscribe(
  //       res => {
  //         this.alert=true;
  //         this.mensaje="Se creo el acta correctamente";
  //         this.load=false
  //         this.ngOnInit();
  //       },
  //       err => {
  //         console.log("ERROR");
  //         console.log(err);
  //         this.load=false
  //       }
  //     )
  //   },
  //   err =>{
  //     console.log("ERROR");
  //     this.load=false
  //   }
  // )

}
