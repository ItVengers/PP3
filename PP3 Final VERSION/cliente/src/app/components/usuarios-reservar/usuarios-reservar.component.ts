import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { DataViewModule } from 'primeng/dataview';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
// import { DatePipe } from '@angular/common';

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
    precioTotal: 0,
    checkIn: "",
    checkOut: "",
    categoria: "",
    estadia: 0,

  };

  estado: number = 4;
  idPersona: number = 4;
  fechaReserva: Date = new Date();


  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private location: Location,
    // private datePipe: DatePipe
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      cantidadPax: string;
      habitacion_id: string;
      precioTotal: number;
      checkIn: string;
      checkOut: string;
      categoria: string,
      estadia: number,

    };

    this.datosreserva.cantidadPax = state.cantidadPax;
    this.datosreserva.precioTotal = state.precioTotal;
    this.datosreserva.habitacion_id = state.habitacion_id;
    this.datosreserva.checkIn = state.checkIn;
    this.datosreserva.checkOut = state.checkOut;
    this.datosreserva.categoria = state.categoria;
    this.datosreserva.estadia = state.estadia;

  }

  ngOnInit(): void {
    console.log(this.datosreserva);
  }
  goBack() {
    this.location.back();
  }

  datosReserva() {
    this.fechaReserva.setDate(this.fechaReserva.getDate());
    console.log(this.fechaReserva);

    let reserva = {

      fecReserva: this.fechaReserva,
      fecCheckIn: this.datosreserva.checkIn,
      fecCheckOut: this.datosreserva.checkOut,
      precio: this.datosreserva.precioTotal,
      habId: this.datosreserva.habitacion_id,
      status: this.estado,
      perId: this.idPersona
    }

    console.log(reserva);

    this.usuariosService.insertarReserva(reserva).subscribe(
      res => {
        //this.habitaciones = res;
        console.log(res);

      },
      err => console.log(err)
    )

  }

  enviarDatosReserva(datos: any){

    this.router.navigate(['../usuarios/listarhabitaciones']);

  }
}
