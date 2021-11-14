import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { DataViewModule } from 'primeng/dataview';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-listar-habitaciones',
  templateUrl: './listar-habitaciones.component.html',
  styleUrls: ['./listar-habitaciones.component.css']
})
export class ListarHabitacionesComponent implements OnInit {
  habitaciones: any = [];
  revelar: boolean = true;

  datos = { fechaIngreso: "", fechaEgreso: "", cantPersona: 0, hotel:'', fechaingresoAcortada: '', estadia: 0 }; //Datos provenientes de la pagina de inicio, sirve para el NGOnInit

  // datosreserva = { cantidadPax: "", PrecioTotal: "", habitacionID: "" } //Datos provenientes de la pagina de inicio, sirve para el NGOnInit

  constructor(private usuariosService: UsuariosService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      checkIn: string,
      checkOut: string,
      cantPersonas: number,
      hotel: string,
      fechaIngreso: string,
      estadia: number

    };

    this.datos.fechaIngreso = state.checkIn;
    this.datos.fechaEgreso = state.checkOut;
    this.datos.cantPersona = state.cantPersonas;
    this.datos.hotel = state.hotel;
    this.datos.fechaingresoAcortada = state.fechaIngreso;
    this.datos.estadia = state.estadia;

  }

  ngOnInit() {

    console.log(this.datos);
    this.usuariosService.listarHabitaciones(this.datos).subscribe(
      res => {
        this.habitaciones = res;
        console.log("METODO LISTAR HABITACIONES")
        console.log(res);

      },
      err => console.log(err)
    )
  }


  enviarDatosReserva(datos: any) {

    let preciototal: number = datos.precio * this.datos.estadia;
    let pasajeros: number = datos.pasajeros;
    let idHab: string = datos.idHabitacion;
    let cate: string = datos.descripcion;
    let estadia: number = this.datos.estadia;
    console.log(this.habitaciones);
    const navigationExtras: NavigationExtras = {
      state: {
        habitacion_id: idHab,
        cantidadPax: pasajeros,
        precioTotal: preciototal,
        categoria: cate,
        checkIn: this.datos.fechaIngreso,
        checkOut: this.datos.fechaEgreso,
        estadia: estadia
      }
    }
    console.log(navigationExtras);

    this.router.navigate(['../usuarios/reservar/' + idHab], navigationExtras);

  }

}




