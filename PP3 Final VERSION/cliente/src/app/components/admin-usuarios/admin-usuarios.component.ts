import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuario:any = [];
  constructor(private usuariosService:UsuariosService, private location: Location) { }

  ngOnInit(): void {
    this.usuariosService.usuariosAdmin().subscribe(
			res => { 
        this.usuario = res; 
        console.log(res)
      },      
			err => console.log(err)      
		)
  }
goBack(){
  this.location.back();
}
}
