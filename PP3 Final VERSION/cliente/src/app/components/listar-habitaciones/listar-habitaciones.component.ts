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

  datos = {fechaIngreso: "", fechaEgreso: "", cantPersona: 0 };

  datosreserva = {cantidadPax: "", PrecioTotal: "", habitacionID: "" }

  constructor(private usuariosService: UsuariosService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      checkIn: string,
      checkOut: string,
      cantPersonas: number,

    };

    this.datos.fechaIngreso = state.checkIn;
    this.datos.fechaEgreso = state.checkOut;
    this.datos.cantPersona = state.cantPersonas;
  }

  ngOnInit() {
    this.usuariosService.listarHabitaciones(this.datos).subscribe(
      res => {
        this.habitaciones = res;
        console.log(res);

      },
      err => console.log(err)
    )
  }


  enviarDatosReserva(datos: any){

    let preciototal: string = datos.precio;
    let pasajeros: number = datos.pasajeros;
    let idHab: string = datos.idHabitacion;
    console.log(this.habitaciones);
    const navigationExtras: NavigationExtras = {
      state: {
        habitacion_id: idHab,
        cantidadPax: pasajeros,
        precioTotal: preciototal
      }
    }
    console.log(navigationExtras);

    this.router.navigate(['../usuarios/reservar/'+ idHab], navigationExtras);



  }

}




