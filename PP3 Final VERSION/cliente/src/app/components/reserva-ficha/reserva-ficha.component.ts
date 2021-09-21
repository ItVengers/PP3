import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reserva-ficha',
  templateUrl: './reserva-ficha.component.html',
  styleUrls: ['./reserva-ficha.component.css']
})
export class ReservaFichaComponent implements OnInit {
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
  


