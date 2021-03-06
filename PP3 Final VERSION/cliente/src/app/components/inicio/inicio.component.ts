import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, NavigationExtras } from '@angular/router';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [MessageService, DatePipe],
})
export class InicioComponent implements OnInit {

  // login_: boolean = false;


  minDate: Date;
  maxDate: Date;
  constructor(private usuariosService: UsuariosService, private router: Router, private messageService: MessageService, protected fb: FormBuilder,
    private datePipe: DatePipe) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate = new Date();
    this.maxDate.setDate(this.checkIn.getDate() + 45);
  }

  hoteles: any = [];
  hotel = { idHotel: '' };

  seleccionado: string = "";
  checkIn: Date = new Date();
  checkOut: string = "";
  personas: number = 1;
  selectedDay: string = 'Hotel Cordoba';


  ngOnInit(): void {
    this.traerHoteles();
    console.log(this.hoteles);
  }


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
    console.log(this.selectedDay)
    let nro_hotel = 0;
    // if (this.selectedDay == 'Hotel Cordoba') {
    //   nro_hotel = 1
    // } else {
    //   if (this.selectedDay == 'Holiday Inn Cordoba') {
    //     nro_hotel = 2
    //   } else {
    //     if (this.selectedDay == 'Howard Johnson La Ca??ada Hotel & Suites') {
    //       nro_hotel = 3
    //     }  else {
    //       if (this.selectedDay == 'NH C??rdoba Urbano') {
    //         nro_hotel = 4
    //     }
    //   }
    // }

    if (this.selectedDay == 'Hotel Cordoba') {
      nro_hotel = 1;
    }
    if (this.selectedDay == 'Holiday Inn Cordoba') {
      nro_hotel = 2;
    }
    if (this.selectedDay == 'Howard Johnson La Ca??ada Hotel & Suites') {
      nro_hotel = 3;
    }
    if (this.selectedDay == 'NH C??rdoba Urbano') {
      nro_hotel = 4;
    }



    console.log(this.selectedDay, nro_hotel);


    let checkIn = this.datePipe.transform(this.checkIn, 'yyyy-MM-dd');
    let checkOut = this.datePipe.transform(this.checkOut, 'yyyy-MM-dd');

    let str1: string = this.datePipe.transform(this.checkIn, 'MM-dd')!;
    var str2 = new String('1900-');
    let fechaingreso = str2.concat(str1);

    var date1 = new Date(this.checkIn);
    var date2 = new Date(this.checkOut);
    var Time = date2.getTime() - date1.getTime();
    // console.log(Time);
    var Days = Time / (1000 * 3600 * 24);
    // console.log(Days);

    // console.log("TRUNQUEO: " + Math.trunc(Days));

    var estadia = Math.trunc(Days);

    if (estadia == 0) {
      estadia = 1;
    }

    console.log(checkOut);

    if (localStorage.getItem('session') == '1') {
      if (checkOut != null) {
        if(estadia <= 45){
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
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'No se permiten reservas de mas de 45 dias!',
          });
        }
      }
      else {

        // window.alert("ERROR: CHECKOUT VACIO");
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR! No selecciono una fecha de CheckOut',
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'info',
        summary: 'Debe de iniciar sesion para realizar una busqueda de habitaciones!',
      });
    }
  }
  // addSingle() {
  //   this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  // }
}

