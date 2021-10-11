import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { DataViewModule } from 'primeng/dataview';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-habitaciones',
  templateUrl: './listar-habitaciones.component.html',
  styleUrls: ['./listar-habitaciones.component.css']
})
export class ListarHabitacionesComponent implements OnInit {
  habitaciones: any = [];
  revelar: boolean = true;

  datos = {fechaIngreso: "", fechaEgreso: "", cantPersona: 0 };

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
        console.log(res)
      },
      err => console.log(err)
    )
  }

}




