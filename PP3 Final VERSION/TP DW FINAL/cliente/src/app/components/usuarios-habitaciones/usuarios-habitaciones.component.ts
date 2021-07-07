import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuarios-habitaciones',
  templateUrl: './usuarios-habitaciones.component.html',
  styleUrls: ['./usuarios-habitaciones.component.css']
})
export class UsuariosHabitacionesComponent implements OnInit {

  rol: any = "";
  habitaciones: any = [];
  nuevaHab = { categoria: "", descripcion: "", precio: 0 };
  errorCategoria = 0;
  errorDescripcion = 0;
  errorPrecio = 0;
  a: boolean = false;
  Desc_Tabla: number = 0;
  Precio_Tabla: number = 0;

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


  modificarYverificar(habitacion: any) {
    this.verificarPrecioTabla(habitacion.precio);
    this.verificarDescripcionTabla(habitacion.descripcion);

    switch (this.Desc_Tabla) {
      case 1:
        window.alert("ERROR, LA DESCRIPCIÓN NO PUEDE SER VACÍO!!");
        break;
      case 2:
        window.alert("ERROR, LA DESCRIPCIÓN NO DEBE SER TAN LARGA");
        break;
    }

    switch (this.Precio_Tabla) {
      case 1:
        window.alert("ERROR, EL PRECIO NO PUEDE SER 0!!");
        break;
      case 2:
        window.alert("ERROR, EL PRECIO NO PUEDE SER NEGATIVO!!");
        break;
        case 3:
        window.alert("ERROR, EL PRECIO NO PUEDE SER VACIO!!");
        break;
    }

    // if (this.Desc_Tabla == true) {
    //   window.alert("ERROR EN EL CAMPO DESCRIPCION");
    // }

    // if (this.Precio_Tabla == true) {
    //   window.alert("ERROR EN EL CAMPO PRECIO");
    // }

    if (this.Precio_Tabla == 0 && this.Desc_Tabla == 0 && habitacion.precio != null) {
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
    // window.alert("ERROR, EL PRECIO NO PUEDE SER VACIO!!");
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


  agregarYverificar() {
    this.verificarForm();
    if (this.a == false) {
      window.alert("ERROR");

    }
    else {
      this.usuarioService.guardarHabitacion(this.nuevaHab).subscribe(
        res => {
          let result: any = res;
          console.log(result.message);
          this.ngOnInit();
          window.alert("HABITACION AGREGADA!!");
          this.nuevaHab.categoria = "";
          this.nuevaHab.descripcion = "";
          this.nuevaHab.precio = 0;


        },
        err => console.log(err)
      )
    }

  }

  verificarCategoria(cat: string) {
    if (cat.length == 0)
      return 1;
    if (cat.length > 20)
      return 2;
    return 0;
  }

  verificarDescripcion(desc: string) {
    if (desc.length == 0)
      return 1;
    if (desc.length > 300)
      return 2;
    return 0;
  }

  verificarPrecio(pre: any) {
    if (pre.length == 0) {
      return 1;
    }
    if (pre == "0") {
      return 2;
    }
    if (pre < 0) {
      return 3;
    }

    return 0;
  }

  verificarForm(): boolean {
    this.errorCategoria = this.verificarCategoria(this.nuevaHab.categoria);
    this.errorDescripcion = this.verificarDescripcion(this.nuevaHab.descripcion);
    this.errorPrecio = this.verificarPrecio(this.nuevaHab.precio);
    if (this.errorCategoria + this.errorDescripcion + this.errorPrecio > 0) {
      return this.a = false;
    }
    return this.a = true;
  }

  limpiarCategoria() {
    if (this.errorCategoria > 0) {
      console.log("Limpiar categoria");
      this.nuevaHab.categoria = "";
      this.errorCategoria = 0;
    }

  }

  limpiarDescripcion() {
    if (this.errorDescripcion > 0) {
      console.log("Limpiar descripcion");
      this.nuevaHab.descripcion = "";
      this.errorDescripcion = 0;
    }
  }

  limpiarPrecio() {
    if (this.errorPrecio > 0) {
      console.log("Limpiar precio");
      this.nuevaHab.precio = 0;
      this.errorPrecio = 0;
    }

  }

  verificarDescripcionTabla(desc: string) {
    if (desc.length == 0)
      return this.Desc_Tabla = 1;
    if (desc.length > 50)
      return this.Desc_Tabla = 2;
    return this.Desc_Tabla = 0;
  }

  verificarPrecioTabla(pre: number) {
    if (pre == 0)
      return this.Precio_Tabla = 1;
    if (pre < 0)
      return this.Precio_Tabla = 2;
    if (pre == null) {
      return this.Precio_Tabla = 3
    }
    return this.Precio_Tabla = 0;
  }
}
