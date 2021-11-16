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
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: err.message
          });
        }
      )
    }
    else {
      this.isLogin = false;
      this.messageService.add({
        severity: 'error',
        summary: 'ERROR',
        detail: 'Las contraseñas no coinciden!'
      });
    }
  }
}
