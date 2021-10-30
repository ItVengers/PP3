import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})

export class MisReservasComponent implements OnInit {
  idPersona = localStorage.getItem('idPersona');

  datosreserva = {
    idReserva: "", fechaDesde: "", fechaHasta: "", fechaReserva: "", habitacion_id: "",
    cantidadPax: "", persona_id: "", precioTotal: "",
  };


  constructor(private usuariosService: UsuariosService,
    private messageService: MessageService,
    private router: Router, private location: Location) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as {
    //   idReserva: string,
    //   fechaDesde: string,
    //   fechaHasta: string,
    //   fechaReserva: string,
    //   habitacion_id: string,
    //   cantidadPax: string,
    //   persona_id: string,
    //   precioTotal: string
    // };

    // this.datosreserva.cantidadPax = state.cantidadPax;
    // this.datosreserva.precioTotal = state.precioTotal;
    // this.datosreserva.persona_id = state.persona_id;
    // this.datosreserva.habitacion_id = state.habitacion_id;
    // this.datosreserva.fechaReserva = state.fechaReserva;
    // this.datosreserva.fechaHasta = state.fechaHasta;
    // this.datosreserva.fechaDesde = state.fechaDesde;
    // this.datosreserva.idReserva = state.idReserva;
  }

  ngOnInit(): void {
    console.log()
    this.mostrarDatos(this.idPersona);
  }

  mostrarDatos(id: any) {
    this.usuariosService.peticionDatosUsuarios(id).subscribe(
      (res) => {
        let result: any = res;
        console.log(res);
        this.datosreserva = result;

        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Bienvenido!!!',
        //   detail: result,
        // });
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

  goBack() {
    this.location.back();
  }
}
