import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { DataViewModule } from 'primeng/dataview';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios-reservar',
  templateUrl: './usuarios-reservar.component.html',
  styleUrls: ['./usuarios-reservar.component.css']
})
export class UsuariosReservarComponent implements OnInit {
  habitacion: any = [];
  
  constructor(private usuariosService: UsuariosService, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }
  goBack(){
    this.location.back();
  }
}
