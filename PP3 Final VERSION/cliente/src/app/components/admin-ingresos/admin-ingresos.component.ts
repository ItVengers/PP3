import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-ingresos',
  templateUrl: './admin-ingresos.component.html',
  styleUrls: ['./admin-ingresos.component.css']
})
export class AdminIngresosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router, private location: Location) { }

  reservasPendientes: any = [];



  ngOnInit(): void {
    this.usuariosService.traerReservasPendientes().subscribe(
      res => {
        this.reservasPendientes = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  realizarCheckIn(id: string) {

    this.usuariosService.verificacionReserva(id).subscribe(
      res => {
        this.reservasPendientes = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }
  goBack(){
    this.location.back();
  }
}
