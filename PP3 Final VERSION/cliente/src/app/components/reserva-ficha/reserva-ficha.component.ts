import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { Location } from '@angular/common';


@Component({
  selector: 'app-reserva-ficha',
  templateUrl: './reserva-ficha.component.html',
  styleUrls: ['./reserva-ficha.component.css']
})
export class ReservaFichaComponent implements OnInit {

  datosreserva = {
    nombre: "", apellido: "", dni: "", telefono: "", mail: "" };


  constructor(private usuariosService: UsuariosService, private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      nombre:string,
      apellido: string,
      dni: string,
      telefono: string,
      mail: string,
    };

    this.datosreserva.nombre = state.nombre;
    this.datosreserva.apellido = state.apellido;
    this.datosreserva.dni = state.dni;
    this.datosreserva.telefono = state.telefono;
    this.datosreserva.mail = state.mail;
  }

  ngOnInit(): void {
    console.log()
    this.mostrarDatos();
  }

  mostrarDatos() {
    console.log(this.datosreserva);
  }

  goBack(){
    this.location.back();
  }
}



