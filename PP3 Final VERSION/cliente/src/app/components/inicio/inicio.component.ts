import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, NavigationExtras } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [MessageService, DatePipe],
})
export class InicioComponent implements OnInit {

  minDate: Date;
  constructor(private usuariosService: UsuariosService, private router: Router, private messageService: MessageService, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  hoteles: any = [];
  hotel = { idHotel: '' };

  seleccionado: string = "";
  checkIn: Date = new Date();
  checkOut: string = "";
  personas: number = 1;


  ngOnInit(): void {

    this.traerHoteles();
    console.log(this.hoteles);

  }

  selectedDay: string = 'Hotel Sur Centro';

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
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
    this.usuariosService.buscarId(desc).subscribe(
      (res) => {
        let result: any = res;
        this.hotel = result;
        console.log("HOTEL NUMERO " + this.hotel.idHotel);
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
    let nro_hotel = 0;
    if (this.selectedDay == 'Hotel Sur Centro') {
      nro_hotel = 1
    } else {
      if (this.selectedDay == 'Hotel del Plata') {
        nro_hotel = 2
      } else {
        if (this.selectedDay == 'Hotel Cordoba') {
          nro_hotel = 3
        }
      }
    }

    let checkIn = this.datePipe.transform(this.checkIn, 'yyyy-MM-dd');
    let checkOut = this.datePipe.transform(this.checkOut, 'yyyy-MM-dd');


    let str1: string = this.datePipe.transform(this.checkIn, 'MM-dd')!;
    var str2 = new String('1900-');
    let fechaingreso = str2.concat(str1);

    var date1 = new Date(this.checkIn);
    var date2 = new Date(this.checkOut);
    var Time = date2.getTime() - date1.getTime();
    console.log(Time);
    var Days = Time / (1000 * 3600 * 24);
    console.log(Days);

    console.log("TRUNQUEO: " + Math.trunc(Days));

    var estadia = Math.trunc(Days);

    // var estadia  = Days.toString();
    // console.log(estadia.substring(0,1));

    // estadia = estadia.substring(0,1);

    // console.log("ESTADIA: " +estadia);//Diference in Days.

    const navigationExtras: NavigationExtras = {
      state: {
        checkIn: checkIn,
        checkOut: checkOut,
        cantPersonas: this.personas,
        hotel: nro_hotel,
        fechaIngreso: fechaingreso,
        estadia: estadia
      }
    }
    console.log(navigationExtras);
    this.router.navigate(['../usuarios/listarhabitaciones'], navigationExtras);

  }
  // calcularDias(resultado: ){
  // let checkOut = new Date();
  // fechaIngreso = new Date(fechaIngreso);
  // fechaEgreso = new Date(fechaEgreso);

  // return Math.floor((Date.UTC(fechaEgreso.getFullYear(), fechaEgreso.getMonth(), fechaEgreso.getDate()) -
  // Date.UTC(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), fechaIngreso.getDate()) ) /(1000 * 60 * 60 * 24));
}
// }
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
