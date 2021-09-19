import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-habitaciones',
  templateUrl: './admin-habitaciones.component.html',
  styleUrls: ['./admin-habitaciones.component.css']
})
export class AdminHabitacionesComponent implements OnInit {
  habitacion:any = [];
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.habitacionesAdmin().subscribe(
			res => { 
        this.habitacion = res; 
        console.log(res)
      },      
			err => console.log(err)
      
		)
  }

}
