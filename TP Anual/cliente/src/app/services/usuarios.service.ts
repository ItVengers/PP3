import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) { }

  ingresar(usuario: any) {
    return this.http.post(`${this.API_URI}/signin`, usuario);
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['usuarios/inicio']);
  }

  getToken() {
    //Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }
  registrar(usuario:any){
		return this.http.post(`${this.API_URI}/signup`,usuario);
	}
}
