import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Habitacion } from '../models/habitacionModel';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  API_URI = 'http://localhost:3000/user';
  API_URI2 = 'http://localhost:3000/comentario';
  API_URI3 = 'http://localhost:3000/admin';


  logued$ = new EventEmitter<string>();
  admin$ = new EventEmitter<string>();


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
    localStorage.removeItem('rol');
    localStorage.removeItem('idPersona');
    this.router.navigate(['usuarios/inicio']);
  }

  getToken() {
    //Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }
  registrar(usuario: any) {
    return this.http.post(`${this.API_URI}/signup`, usuario);
  }

  listarComentario() {
    return this.http.get(`${this.API_URI2}/list`);

  }

  buscarComentario(id: string) {
    return this.http.get(`${this.API_URI2}/find/${id}`);
  }

  guardarComentario(comentario: Comentario) {
    return this.http.post(`${this.API_URI2}/create`, comentario, { withCredentials: true });
  }

  eliminarComentario(comentario: any) {
    return this.http.delete(`${this.API_URI2}/delete/${comentario.id}`);
  }

  ordenarID() {
    return this.http.get(`${this.API_URI2}/ordenar`);

  }

  abmhabitaciones() {
    return this.http.get(`${this.API_URI3}/abmproductos`);
  }

  guardarHabitacion(agregarHab: Habitacion) {
    console.log("Entre al metodo: guardarHabitacion");
    console.log(agregarHab);
    return this.http.post(`${this.API_URI3}/agregar`, agregarHab);
  }

  eliminarHabitacion(eliminarHab: any) {
    console.log("Entre al metodo: eliminarHabitacion");
    console.log(eliminarHab);
    return this.http.delete(`${this.API_URI3}/delete/${eliminarHab.idH}`);
  }

  actualizarHabitacion(actualizarHab: Habitacion): Observable<Habitacion> {
    console.log("Entre al metodo: actualizarHabitacion");
    console.log(actualizarHab);
    return this.http.post(`${this.API_URI3}/modificar`, actualizarHab);
  }

  filtrarID(searchText: string) {
    console.log(searchText);
    return this.http.get(`${this.API_URI2}/find/${searchText}`);
  }
}
