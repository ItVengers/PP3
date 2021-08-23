import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listar-habitaciones',
  templateUrl: './listar-habitaciones.component.html',
  styleUrls: ['./listar-habitaciones.component.css']
})
export class ListarHabitacionesComponent implements OnInit {
  habitaciones:any = [];
  revelar:boolean = true;

  constructor(private usuariosService:UsuariosService){	}

  ngOnInit(){
		this.usuariosService.listarHabitaciones().subscribe(
			res => { 
        this.habitaciones = res; 
        console.log(res)
      },      
			err => console.log(err)
		)
	}

}
