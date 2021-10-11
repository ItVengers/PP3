import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, NavigationExtras } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [MessageService, DatePipe],
})
export class InicioComponent implements OnInit {


  // minDate: Date;



  constructor(private usuariosService: UsuariosService, private router: Router, private messageService: MessageService, private datePipe: DatePipe) {
    // this.minDate = new Date();
    // let minCheckIn = new Date(this.checkIn)
    // this.minDate.setDate(minCheckIn.getDate());
  }

  hoteles: any = [];
  zona = { zona_id: "" };

  seleccionado: string = "";
  checkIn: string = "";
  checkOut: string = "";
  personas: number = 1;

  ngOnInit(): void {

    this.traerHoteles();
    console.log(this.hoteles);

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

  enviarDescripcion(desc: string) {
    console.log(desc);
    this.usuariosService.buscarId(desc).subscribe(
      (res) => {
        let result: any = res;
        this.zona.zona_id = result;
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
    // this.traerHoteles();
  }

  //checkIn: any, checkOut: any, personas: number
  enviarDatos() {
    let checkIn = this.datePipe.transform(this.checkIn, 'yyyy-MM-dd');
    let checkOut = this.datePipe.transform(this.checkOut, 'yyyy-MM-dd');

    const navigationExtras: NavigationExtras = {
      state: {
        checkIn: checkIn,
        checkOut: checkOut,
        cantPersonas: this.personas
      }
    }
    console.log(navigationExtras);
    this.router.navigate(['../usuarios/listarhabitaciones'], navigationExtras);

  }

  // enviarFecha(fecha: string) {
  //   console.log(fecha);
  //   this.usuariosService.buscarFecha(fecha).subscribe(
  //     (res) => {
  //       let result: any = res;
  //       this.fecha = result;
  //       console.log(this.fecha)
  //     },
  //     (err) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: err.statusText,
  //         detail: err.error.message,
  //       });
  //       console.log(err.error.message);
  //     }
  //   )
  //   // this.traerHoteles();
  // }
}
