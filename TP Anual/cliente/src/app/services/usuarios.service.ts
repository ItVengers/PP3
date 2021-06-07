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
  
  constructor(private http: HttpClient, private router:Router) { }

  ingresar(usuario:any){
		return this.http.post(`${this.API_URI}/signin`,usuario);
	}
}
