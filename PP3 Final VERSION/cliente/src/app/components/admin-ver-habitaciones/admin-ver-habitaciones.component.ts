import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-ver-habitaciones',
  templateUrl: './admin-ver-habitaciones.component.html',
  styleUrls: ['./admin-ver-habitaciones.component.css']
})
export class AdminVerHabitacionesComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router, private location: Location) { }

  habitaciones: any = [];


  ngOnInit(): void {

    this.usuariosService.vistaDeHabitaciones().subscribe(
      res => {
        this.habitaciones = res;
        console.log(res)
      },
      err => console.log(err)
    )

  }

  goBack() {
    this.location.back();
  }

}
