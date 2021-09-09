import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css'],
  providers: [MessageService],
})
export class MisDatosComponent implements OnInit {

  idPersona = localStorage.getItem('idPersona');
  // loginForm = this.fb.group({
  //   mail: ['', [Validators.required, Validators.email]],
  //   contrasenia: ['',
  //     [Validators.required,
  //     Validators.maxLength(20),
  //     Validators.minLength(6),
  //     Validators.pattern(/^[A-Z][A-Za-z0-9]/)]],
  // });
  constructor(
    private usuariosService: UsuariosService,
    protected fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  user = { nombre: "", apellido: "", dni: "", telefono: "", mail: "", contrasenia: "" };
  repassword: any = "";

  ngOnInit(): void {
    this.traerDatos(localStorage.getItem('idPersona'));
    console.log(this.user);
  }

  traerDatos(id: any) {
    this.usuariosService.peticionDatosUsuarios(id).subscribe(
      (res) => {
        let result: any = res;
        console.log(res);
        this.user = result;

        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Bienvenido!!!',
        //   detail: result,
        // });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.statusText,
          detail: err.error.message,
        });
        console.log(err.error.message);
      }
    )
  }

  modificarDatos(datos: any) {
    if (this.user.contrasenia == this.repassword) {
      this.usuariosService.peticionCambiarDatosUsuarios(datos).subscribe(
        (res) => {
          let result: any = res;
          console.log(result)
          this.ngOnInit();
          this.messageService.add({
            severity: 'success',
            summary: result.message,
            detail: "LOS DATOS HAN SIDO ACTUALIZADOS SATISFACTORIAMENTE",
          });
        }
      )
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'ERROR',
        detail: 'Las contraseñas no coinciden!'
      });
    }
  }
}
