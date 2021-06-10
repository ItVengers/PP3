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
  errorMail = 0;
  errorPassword = 0;

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
        localStorage.setItem('token',result.token);
        this.router.navigate(['usuarios/habitaciones']);
      },
      err => {
        console.log(err.error.message);
      }
    )
  }


  verificarMail(mail: string) {
    const patron = /[a-z0-9]{1,14}@[a-z0-9]{1,10}\.[a-z]{2,3}/;
    if (mail.length == 0)
      return 1;
    if (mail.length > 27)
      return 2;
    if (!patron.test(mail))
      return 3;
    return 0;
  }

  verificarPassword(password: string) {
    const patron = /^[A-Z][A-Za-z0-9]{6,20}$/;
    if (password.length == 0)
      return 1;
    if (password.length > 20)
      return 2;
    if (!patron.test(password))
      return 3;
    return 0;
  }

  verificarForm(): boolean {
    this.errorMail = this.verificarMail(this.user.mail);
    this.errorPassword = this.verificarPassword(this.user.password);
    if ((this.errorMail + this.errorPassword) > 0) {
      return false;
    }
    return true;
  }

  limpiarPassword() {
    if (this.errorPassword > 0) {
      console.log("Limpiar password");
      this.user.password = "";
      this.errorPassword = 0;
    }

  }

  limpiarMail() {
    if (this.errorMail > 0) {
      console.log("Limpiar email");
      this.user.mail = "";
      this.errorMail = 0;
    }
  }

}
