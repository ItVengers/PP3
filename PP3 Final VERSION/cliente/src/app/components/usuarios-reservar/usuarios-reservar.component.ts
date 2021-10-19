import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { DataViewModule } from 'primeng/dataview';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios-reservar',
  templateUrl: './usuarios-reservar.component.html',
  styleUrls: ['./usuarios-reservar.component.css'],
})
export class UsuariosReservarComponent implements OnInit {
  habitacion: any = [];
  //habitacion = {fechaIngreso: "", fechaEgreso: "", cantPersona: 0 };

  datosreserva = {
    habitacion_id: "",
    cantidadPax: "",
    precioTotal: ""
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      cantidadPax: string;
      habitacion_id: string;
      precioTotal: string;
    };

    this.datosreserva.cantidadPax = state.cantidadPax;
    this.datosreserva.precioTotal = state.precioTotal;
    this.datosreserva.habitacion_id = state.habitacion_id;
  }

  ngOnInit(): void {
    console.log(this.datosreserva);
  }
  goBack() {
    this.location.back();
  }

  datosReserva() {}
}
