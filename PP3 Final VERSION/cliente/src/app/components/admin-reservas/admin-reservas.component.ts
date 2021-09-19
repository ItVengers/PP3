
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-admin-reservas',
  templateUrl: './admin-reservas.component.html',
  styleUrls: ['./admin-reservas.component.css']
})

export class AdminReservasComponent implements OnInit {
  reserva:any = [];
  // dayjs(fecha)
  // revelar:boolean = true;
 
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.reservasAdmin().subscribe(
			res => { 
        this.reserva = res; 
        console.log(res)
      },      
			err => console.log(err)
      
		)
  }
}

// const events = document.querySelectorAll('.event')
// events.forEach(event =>  {
//   const date = dayjs(event.dataset.date);
//   const dateElement = event.querySelector('.date')
//   dateElement.innerText = date;
// });
