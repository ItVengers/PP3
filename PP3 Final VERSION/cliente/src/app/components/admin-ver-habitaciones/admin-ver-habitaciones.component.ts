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
        this.usuariosService.habilitarHabitacion(nroHab).subscribe(
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
