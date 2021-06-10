import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-habitaciones',
  templateUrl: './usuarios-habitaciones.component.html',
  styleUrls: ['./usuarios-habitaciones.component.css']
})
export class UsuariosHabitacionesComponent implements OnInit {

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

}
