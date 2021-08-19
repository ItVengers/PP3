import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css'],
  providers: [MessageService]
})
export class UsuariosRegistrarComponent implements OnInit {

  isLogin = false;
  loginForm = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    nombre: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    apellido: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    dni: ['',
      [Validators.required,
      Validators.maxLength(9),
      Validators.minLength(7),
      Validators.pattern(/^[0-9]/)]],
    telefono: ['',
      [Validators.required,
      Validators.maxLength(10),
      Validators.minLength(8),
      Validators.pattern(/^[0-9]/)]],
    contrasenia: ['',
      [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6),
      Validators.pattern(/^[A-Z][A-Za-z0-9]/)]],
    repassword: ['',
      [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6),
      Validators.pattern(/^[A-Z][A-Za-z0-9]/)]],
  });
  user = { nombre: "", apellido: "", dni: "", telefono: "", mail: "", contrasenia: "" };

  repassword: any = "";

  constructor(private usuariosService: UsuariosService,
    private router: Router,
    protected fb: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  registrar() {
    this.isLogin = true;
    this.user.nombre = this.loginForm.get(['nombre'])!.value;
    console.log(this.user.nombre);
    this.user.apellido = this.loginForm.get(['apellido'])!.value;
    console.log(this.user.apellido);
    this.user.dni = this.loginForm.get(['dni'])!.value;
    console.log(this.user.dni);
    this.user.telefono = this.loginForm.get(['telefono'])!.value;
    console.log(this.user.telefono);
    this.user.mail = this.loginForm.get(['mail'])!.value;
    console.log(this.user.mail);
    this.user.contrasenia = this.loginForm.get(['contrasenia'])!.value;
    console.log(this.user.contrasenia);
    this.repassword = this.loginForm.get(['repassword'])!.value;
    console.log(this.user.contrasenia);
    console.log("Sign Up");
    console.log(this.user);
    if (this.user.contrasenia == this.repassword) {
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
    else
    {
      this.isLogin = false;
      this.messageService.add({
        severity: 'error',
        summary: 'ERROR',
        detail: 'Las contraseñas no coinciden!'
      });
    }
  }

  // verificarForm(): boolean {
  //   this.errorNombre = this.verificarNombre(this.user.nombre);
  //   this.errorApellido = this.verificarApellido(this.user.apellido);
  //   this.errorDni = this.verificarDni(this.user.dni);
  //   this.errorTelefono = this.verificarTelefono(this.user.telefono);
  //   this.errorPassword = this.verificarPassword(this.user.contrasenia);
  //   //this.errorRePassword = this.verificarRePassword(this.user.contrasenia, this.user.repassword);
  //   this.errorMail = this.verificarMail(this.user.mail);
  //   if ((this.errorNombre + this.errorApellido + this.errorDni + this.errorTelefono + this.errorPassword + this.errorRePassword + this.errorMail) > 0) {
  //     return false;
  //   }
  //   return true;
  // }


  // verificarNombre(nombre: string) {
  //   const patron = /^[A-Z][A-Za-z]{3,14}$/;
  //   if (nombre.length == 0)
  //     return 1;
  //   if (nombre.length > 14)
  //     return 2;
  //   if (nombre.length < 3)
  //     return 3;
  //   if (!patron.test(nombre))
  //     return 4;
  //   return 0;
  // }

  // verificarApellido(apellido: string) {
  //   const patron = /^[A-Z][A-Za-z]{3,14}$/;
  //   if (apellido.length == 0)
  //     return 1;
  //   if (apellido.length > 14)
  //     return 2;
  //   if (apellido.length < 3)
  //     return 3;
  //   if (!patron.test(apellido))
  //     return 4;
  //   return 0;
  // }

  // verificarDni(dni: string) {
  //   const patron = /^[0-9]{7,9}$/;
  //   if (dni.length == 0)
  //     return 1;
  //   if (dni.length > 9)
  //     return 2;
  //   if (dni.length < 7)
  //     return 3;
  //   if (!patron.test(dni))
  //     return 4;
  //   return 0;
  // }

  // verificarTelefono(telefono: string) {
  //   const patron = /^[0-9]{8,10}$/;
  //   if (telefono.length == 0)
  //     return 1;
  //   if (telefono.length > 10)
  //     return 2;
  //   if (telefono.length < 8)
  //     return 3;
  //   if (!patron.test(telefono))
  //     return 4;
  //   return 0;
  // }

  // verificarMail(mail: string) {
  //   const patron = /[a-z0-9]{1,14}@[a-z0-9]{1,10}\.[a-z]{2,3}/;
  //   if (mail.length == 0)
  //     return 1;
  //   if (mail.length > 27)
  //     return 2;
  //   if (!patron.test(mail))
  //     return 3;
  //   return 0;
  // }

  // verificarPassword(password: string) {
  //   const patron = /^[A-Z][A-Za-z0-9]{6,20}$/;
  //   if (password.length == 0)
  //     return 1;
  //   if (password.length > 21)
  //     return 2;
  //   if (password.length < 6)
  //     return 3;
  //   if (!patron.test(password))
  //     return 4;
  //   return 0;
  // }

  // verificarRePassword(password: any, repassword: any): number {
  //   if (password != repassword) {
  //     return 1;
  //   }
  //   if (repassword.length == 0) {
  //     return 2;
  //   }
  //   return 0;
  // }


  // limpiarNombre() {
  //   if (this.errorNombre > 0) {
  //     console.log("Limpiar nombre");
  //     this.user.nombre = "";
  //     this.errorNombre = 0;
  //   }
  // }
  // limpiarApellido() {
  //   if (this.errorApellido > 0) {
  //     console.log("Limpiar Apellido");
  //     this.user.apellido = "";
  //     this.errorApellido = 0;
  //   }
  // }

  // limpiarDni() {
  //   if (this.errorDni > 0) {
  //     console.log("Limpiar DNI");
  //     this.user.dni = "";
  //     this.errorDni = 0;
  //   }
  // }

  // limpiarTelefono() {
  //   if (this.errorTelefono > 0) {
  //     console.log("Limpiar Telefono");
  //     this.user.telefono = "";
  //     this.errorTelefono = 0;
  //   }
  // }

  // limpiarMail() {
  //   if (this.errorMail > 0) {
  //     console.log("Limpiar email");
  //     this.user.mail = "";
  //     this.errorMail = 0;
  //   }
  // }

  // limpiarPassword() {
  //   if (this.errorPassword > 0) {
  //     console.log("Limpiar password");
  //     this.user.contrasenia = "";
  //     this.errorPassword = 0;
  //   }

  // }

  // limpiarRePassword() {
  //   if (this.errorRePassword > 0) {
  //     console.log("Limpiar repassword");
  //     //this.user.repassword = "";
  //     this.errorRePassword = 0;
  //   }

  // }
}
