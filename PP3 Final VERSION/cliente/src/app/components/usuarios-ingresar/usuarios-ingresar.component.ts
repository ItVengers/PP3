import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css'],
  providers: [MessageService],
})
export class UsuariosIngresarComponent implements OnInit {
  isLogin = false;
  loginForm = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$'),
      ],
    ],
  });
  usuario = {mail: "", password: ""};
  constructor(
    private usuariosService: UsuariosService,
    protected fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ingresar() {
    this.isLogin = true;
    this.usuario.mail= this.loginForm.get(['mail'])!.value;
    console.log(this.usuario.mail);
    this.usuario.password= this.loginForm.get(['password'])!.value;
    console.log(this.usuario.password);
    //this.usuariosService.ingresar(this.loginForm.get(['mail'])!.value).subscribe(
    this.usuariosService.ingresar(this.usuario).subscribe(
      (res) => {
        let result: any = res;
        console.log(result);
        localStorage.setItem('rol', result.rol);
        localStorage.setItem('token', result.token);
        localStorage.setItem('idPersona', result.idPersona);
        this.usuariosService.logued$.emit();

        this.isLogin = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Bienvenido!!!',
          detail: result,
        });

        if (result.rol == 'admin') {
          this.usuariosService.admin$.emit();
          this.router.navigate(['admin/home']);
        } else {
          this.router.navigate(['usuarios/home']);
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.statusText,
          detail: err.error.message,
        });
        console.log(err.error.message);
        this.isLogin = false;
      }
    );
  }
}
