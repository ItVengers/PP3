import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Habitacion } from '../models/habitacionModel';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarioModel';
import { BusquedaReserva } from '../models/busquedaReserva';
// import {Http, Response} from 'angular2/http';
// No funciona el IMPORT

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URI = environment.API_URI + '/user';
  API_URI2 = environment.API_URI + '/comentario';
  API_URI3 = environment.API_URI + '/admin';
  API_URI4 = environment.API_URI + '/habitaciones'


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



  filtrarID(searchText: string) {
    console.log(searchText);
    return this.http.get(`${this.API_URI2}/find/${searchText}`);
  }
  // nuevos services
  //---------
  listarHabitaciones(datos: BusquedaReserva): Observable<BusquedaReserva> {
    return this.http.post(`${this.API_URI4}/listarhabitaciones`, datos);
  }

  peticionDatosUsuarios(id: string) {
    return this.http.get(`${this.API_URI}/misdatos/${id}`);
  }

  peticionCambiarDatosUsuarios(actualizarDatos: Usuario): Observable<Usuario> {
    return this.http.post(`${this.API_URI}/modificardatos`, actualizarDatos);
  }

  listarHoteles() {
    return this.http.get(`${this.API_URI}/listarhoteles`);
  }

  buscarId(desc: string) {
    return this.http.get(`${this.API_URI}/buscarId/${desc}`);
  }

  buscarFecha(fecha: string) {
    console.log("Estoy en usuarioService: " + fecha);
    return this.http.get(`${this.API_URI}/buscarFecha/${fecha}`);
  }

  // -------------
  // ADMIN SERVICE -----------
  // -------------

  reservasAdmin() {
    return this.http.get(`${this.API_URI3}/reservas`);
  }
  usuariosAdmin() {
    return this.http.get(`${this.API_URI3}/usuarios`);
  }
  habitacionesAdmin() {
    return this.http.get(`${this.API_URI3}/habitaciones`);
  }

  // Services Pablo
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
    return this.http.post(`${this.API_URI3}/modificar`, actualizarHab);
  }

  listarDatosReservas(idRes: any){
    return this.http.get(`${this.API_URI3}/datosreservas/${idRes}`);
  }

  // User Service (javier)
  usuarioReservar(idHab: any){
    return this.http.get(`${this.API_URI}/reservar/${idHab}`);
  }
}
