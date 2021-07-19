import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit {

  user = { nombre: "", apellido: "", dni: "", telefono: "", mail: "", contrasenia: "", repassword: "" };

  errorNombre = 0;
  errorApellido = 0;
  errorDni = 0;
  errorTelefono = 0;
  errorPassword = 0;
  errorRePassword = 0;
  errorMail = 0;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar() {
    console.log("Sign Up");
    console.log(this.user);
    this.usuariosService.registrar(this.user).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.router.navigate(["usuarios/ingresar"]);
      },
      err => {
        console.log(err.error.message);
      }
    )
  }
  verificarForm(): boolean {
    this.errorNombre = this.verificarNombre(this.user.nombre);
    this.errorApellido = this.verificarApellido(this.user.apellido);
    this.errorDni = this.verificarDni(this.user.dni);
    this.errorTelefono = this.verificarTelefono(this.user.telefono);
    this.errorPassword = this.verificarPassword(this.user.contrasenia);
    this.errorRePassword = this.verificarRePassword(this.user.contrasenia, this.user.repassword);
    this.errorMail = this.verificarMail(this.user.mail);
    if ((this.errorNombre + this.errorApellido + this.errorDni + this.errorTelefono + this.errorPassword + this.errorRePassword + this.errorMail) > 0) {
      return false;
    }
    return true;
  }


  verificarNombre(nombre: string) {
    const patron = /^[A-Z][A-Za-z]{3,14}$/;
    if (nombre.length == 0)
      return 1;
    if (nombre.length > 14)
      return 2;
    if (nombre.length < 3)
      return 3;
    if (!patron.test(nombre))
      return 4;
    return 0;
  }

  verificarApellido(apellido: string) {
    const patron = /^[A-Z][A-Za-z]{3,14}$/;
    if (apellido.length == 0)
      return 1;
    if (apellido.length > 14)
      return 2;
    if (apellido.length < 3)
      return 3;
    if (!patron.test(apellido))
      return 4;
    return 0;
  }

  verificarDni(dni: string) {
    const patron = /^[0-9]{7,9}$/;
    if (dni.length == 0)
      return 1;
    if (dni.length > 9)
      return 2;
    if (dni.length < 7)
      return 3;
    if (!patron.test(dni))
      return 4;
    return 0;
  }

  verificarTelefono(telefono: string) {
    const patron = /^[0-9]{8,10}$/;
    if (telefono.length == 0)
      return 1;
    if (telefono.length > 10)
      return 2;
    if (telefono.length < 8)
      return 3;
    if (!patron.test(telefono))
      return 4;
    return 0;
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
    if (password.length > 21)
      return 2;
    if (!patron.test(password))
      return 3;
    return 0;
  }

  verificarRePassword(password: any, repassword: any): number {
    if (password != repassword) {
      return 1;
    }
    return 0;
  }


  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }
  limpiarApellido() {
    if (this.errorApellido > 0) {
      console.log("Limpiar Apellido");
      this.user.apellido = "";
      this.errorApellido = 0;
    }
  }

  limpiarDni() {
    if (this.errorDni > 0) {
      console.log("Limpiar DNI");
      this.user.dni = "";
      this.errorDni = 0;
    }
  }

  limpiarTelefono() {
    if (this.errorTelefono > 0) {
      console.log("Limpiar Telefono");
      this.user.telefono = "";
      this.errorTelefono = 0;
    }
  }

  limpiarMail() {
    if (this.errorMail > 0) {
      console.log("Limpiar email");
      this.user.mail = "";
      this.errorMail = 0;
    }
  }

  limpiarPassword() {
    if (this.errorPassword > 0) {
      console.log("Limpiar password");
      this.user.contrasenia = "";
      this.errorPassword = 0;
    }

  }

  limpiarRePassword() {
    if (this.errorRePassword > 0) {
      console.log("Limpiar repassword");
      this.user.repassword = "";
      this.errorRePassword = 0;
    }
 
  }
}
