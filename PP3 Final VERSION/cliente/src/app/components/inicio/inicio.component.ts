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
  zona = { zona_id: "" };

  seleccionado: string = "";
  checkIn: Date = new Date();
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
