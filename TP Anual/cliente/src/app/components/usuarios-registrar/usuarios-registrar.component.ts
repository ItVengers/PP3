import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit {
  
  user={  nombre:"", apellido:"", dni:"", telefono:"", mail:"", password:"",repassword:""};

  errorNombre=0;
  errorApellido=0;
  errorDni=0;
  errorTelefono=0;
  errorPassword=0;
  errorRePassrword=0;
  errorMail=0;

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {   
  }
    
  registrar(){
		console.log("Sing Up");
    console.log(this.user);
    this.usuariosService.registrar(this.user).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
      },
      err => {
        console.log(err.error.message);
      }
    )
	}
  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.user.nombre);
    this.errorApellido=this.verificarApellido(this.user.apellido);
    //this.errorDni=this.verificarDni(this.user.dni.toString());
    //this.errorTelefono=this.verificarTelefono(this.user.telefono);
    this.errorPassword=this.verificarPassword(this.user.password);
    this.errorRePassrword=this.verificarRePassword(this.user.password, this.user.repassword);
    this.errorMail=this.verificarMail(this.user.mail);
    if(  (this.errorNombre+this.errorPassword+this.errorRePassrword+this.errorMail)>0){
      return false;
    }
    return true;
  }

  verificarNombre(nombre:string):number {
    const patron=/A-Za-z/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(patron.test(nombre))
      return 3;
    return 0;
  }
  verificarApellido(apellido:string):number {
    const patron=/A-Za-z/;
    if(apellido.length==0)
      return 1;
    if(apellido.length>20)
      return 2;
    if(patron.test(apellido))
      return 3;
    return 0;
  }
  verificarDni(dni:number): number {
    const patron=/0-9/;
    if(dni.toString().length==0)
      return 1;
    if(dni.toString().length>10)
      return 2;
    if(patron.test(dni.toString()))
      return 3;
    return 0;
  }
  verificarTelefono(telefono:number): number {
    const patron=/0-9/;
    if(telefono.toString().length==0)
      return 1;
    if(telefono.toString().length>20)
      return 2;
    if(patron.test(telefono.toString()))
      return 3;
    return 0;
  }

  verificarPassword(password:any): number {
    const patron=/^[A-Z][A-Za-z0-9]{6,20}$]/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(patron.test(password))
      return 3;
    return 0;
  }
  
  verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  }
  
  verificarMail(mail:any): number {
    const patron=/[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}/;
    if(mail.length==0)
      return 1;
    if(mail.length>20)
      return 2;
    if(!patron.test(mail))
      return 3;
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
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarPassword() {
    if (this.errorPassword > 0) {
      console.log("Limpiar password");
      this.user.password = "";
      this.errorPassword = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      console.log("Limpiar repassword");
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }

  }

  limpiarMail() {
    if(this.errorMail>0){
      console.log("Limpiar email");
      this.user.mail = "";
      this.errorMail = 0;
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
      console.log("Limpiar DNI");
      this.user.telefono = "";
      this.errorTelefono = 0;
    }
    }
}