import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-reserva-ficha',
  templateUrl: './reserva-ficha.component.html',
  styleUrls: ['./reserva-ficha.component.css']
})
export class ReservaFichaComponent implements OnInit {
  reserva: any = [];
  // dayjs(fecha)
  // revelar:boolean = true;

  //datosreserva: any = "";

  datosreserva = {
    idReserva: "", fechaDesde: "", fechaHasta: "", fechaReserva: "", habitacion_id: "",
    cantidadPax: "", persona_id: "", precioTotal: "",
  };


  constructor(private usuariosService: UsuariosService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      idReserva: string,
      fechaDesde: string,
      fechaHasta: string,
      fechaReserva: string,
      habitacion_id: string,
      cantidadPax: string,
      persona_id: string,
      precioTotal: string
    };

    this.datosreserva.cantidadPax = state.cantidadPax;
    this.datosreserva.precioTotal = state.precioTotal;
    this.datosreserva.persona_id = state.persona_id;
    this.datosreserva.habitacion_id = state.habitacion_id;
    this.datosreserva.fechaReserva = state.fechaReserva;
    this.datosreserva.fechaHasta = state.fechaHasta;
    this.datosreserva.fechaDesde = state.fechaDesde;
    this.datosreserva.idReserva = state.idReserva;
  }

  ngOnInit(): void {
    this.mostrarDatos();
  }

  mostrarDatos() {
    console.log(this.datosreserva);
  }


}



