import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-egresos',
  templateUrl: './admin-egresos.component.html',
  styleUrls: ['./admin-egresos.component.css']
})
export class AdminEgresosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  reservasConfirmadas: any = [];



  ngOnInit(): void {
    this.usuariosService.traerReservasConfirmadas().subscribe(
      res => {
        this.reservasConfirmadas = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  realizarCheckOut(id: string) {
    this.usuariosService.verificacionCheckOut(id).subscribe(
      res => {
        this.reservasConfirmadas = res;
        console.log(res)
      },
      err => console.log(err)
    )

  }
}
