import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rol: any = "";
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
  }
}
