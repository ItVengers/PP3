import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  user = { mail: "", password: "" };
  reintentar: boolean = false;
  mensaje: string = "";

  constructor(private usuariosService: UsuariosService, private router: Router) {

  }

  ngOnInit(): void {
  }
  ingresar() {
    console.log("Login");
    console.log(this.user);
    this.usuariosService.ingresar(this.user).subscribe(
      res => {
        let result: any = res;
        console.log(result);
        // localStorage.setItem('token',result.token);
        this.router.navigate(['usuarios/inicio']);
      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }
    )
  }

  restablecerForm() {
    this.reintentar = false;
    this.user.mail = "";
    this.user.password = "";
    this.mensaje = "";


  }

}
