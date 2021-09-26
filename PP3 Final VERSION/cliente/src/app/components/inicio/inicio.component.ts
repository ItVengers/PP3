import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [MessageService, DatePipe],
})
export class InicioComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router, private messageService: MessageService, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 365);

  }

  hoteles: any = [];
  zona = { zona_id: "" };

  seleccionado: string = "";
  fecha: string = "";
  minDate: Date;
  maxDate: Date;


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

  enviarFecha(fecha: string) {
    console.log(fecha);
    this.usuariosService.buscarFecha(fecha).subscribe(
      (res) => {
        let result: any = res;
        this.fecha = result;
        console.log(this.fecha)
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


  //PRUEBAS PARA SACAR FORMATO DEL DATAPICKER

  mostrarFormatoFecha() {

    let date = new Date(this.fecha).toLocaleDateString();

    let dates = this.datePipe.transform(this.fecha, 'YYYY/MM/dd');
    console.log(date);
    console.log(dates);
    console.log(this.fecha);
  }
}
