import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-habitaciones',
  templateUrl: './usuarios-habitaciones.component.html',
  styleUrls: ['./usuarios-habitaciones.component.css']
})
export class UsuariosHabitacionesComponent implements OnInit {

  rol: any = "";
  habitaciones: any = [];
  nuevaHab = { categoria: "", descripcion: "", precio: 0 };
  // errorCategoria = 0;
  // errorDescripcion = 0;
  // errorPrecio = 0;

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
    this.usuarioService.abmhabitaciones().subscribe(
      res => {
        this.habitaciones = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  modificar(habitacion: any) {
    this.usuarioService.actualizarHabitacion(habitacion).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
        window.alert("HABITACION MODIFICADA!!");

      },
      err => console.log(err)
    )
  }

  eliminar(habitacion: any) {
    this.usuarioService.eliminarHabitacion(habitacion).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
        window.alert("HABITACION ELIMINADA!!");
      },
      err => console.log(err.error.message)
    )
  }


  agregar() {
    //this.verificarForm();
    this.usuarioService.guardarHabitacion(this.nuevaHab).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
        window.alert("HABITACION AGREGADA!!");

      },
      err => console.log(err)
    )
  }

  // verificarCategoria(cat: string) {
  //   if (cat.length == 0)
  //     return 1;
  //   if (cat.length > 20)
  //     return 2;
  //   return 0;
  // }

  // verificarDescripcion(desc: string) {
  //   if (desc.length == 0)
  //     return 1;
  //   if (desc.length > 300)
  //     return 2;
  //   return 0;
  // }

  // verificarPrecio(pre: any) {
  //   if (pre.length == 0) {
  //     return 1;
  //   }
  //   if (pre == "0") {
  //     return 2;
  //   }
  //   return 0;
  // }

  // verificarForm(): boolean {
  //   this.errorCategoria = this.verificarCategoria(this.nuevaHab.categoria);
  //   this.errorDescripcion = this.verificarDescripcion(this.nuevaHab.descripcion);
  //   this.errorPrecio = this.verificarPrecio(this.nuevaHab.precio);
  //   if (this.errorCategoria + this.errorDescripcion + this.errorPrecio > 0) {
  //     return false;
  //   }
  //   return true;
  // }

  // limpiarCategoria() {
  //   if (this.errorCategoria > 0) {
  //     console.log("Limpiar categoria");
  //     this.nuevaHab.categoria = "";
  //     this.errorCategoria = 0;
  //   }

  // }

  // limpiarDescripcion() {
  //   if (this.errorDescripcion > 0) {
  //     console.log("Limpiar descripcion");
  //     this.nuevaHab.descripcion = "";
  //     this.errorCategoria = 0;
  //   }
  // }

  // limpiarPrecio() {
  //   if (this.errorPrecio > 0) {
  //     console.log("Limpiar precio");
  //     this.nuevaHab.precio = 0;
  //     this.errorCategoria = 0;
  //   }

  // }

}
