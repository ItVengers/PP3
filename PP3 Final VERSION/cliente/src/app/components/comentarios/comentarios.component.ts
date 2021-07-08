import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios: any = [];
  rolPersona = localStorage.getItem('rol');
  idPersona = localStorage.getItem('idPersona');
  comentario = { comentario: "", imagen: "", personaID: this.idPersona };
  flag: boolean = false;
  errorComentario = 0;
  buscarTexto = "";

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarComentario().subscribe(
      res => {
        this.comentarios = res;
        console.log(res);
      },
      err => console.log(err)
    )

  }

  // crearComentario() {
  //   this.usuariosService.guardarComentario(this.comentario).subscribe(
  //     res => {
  //       let result: any = res;
  //       console.log(result.message);
  //       this.ngOnInit();
  //     },
  //     err => {
  //       console.log(err.error.message);
  //     }
  //   )
  // }

  crearComentario() {

    var str = new String(this.comentario.comentario);

    console.log(str);

    this.usuariosService.guardarComentario(this.comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  eliminar(comentario: any) {
    this.usuariosService.eliminarComentario(comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err.error.message)
    )
  }

  filtrar(buscarTexto: any) {
    this.usuariosService.filtrarID(buscarTexto).subscribe(
      res => {
        this.comentarios = res;
        console.log(res)

      },
      err => {
        console.log(err);
        window.alert("ERROR: INGRESE UN VALOR PARA FILTRAR");
      }
    )
  }

  ordenarxID() {
    if (this.flag == false) {
      this.usuariosService.listarComentario().subscribe(
        res => {
          this.comentarios = res;
          console.log(res)
          this.flag = true;
        },
        err => console.log(err)
      )
    }

    if (this.flag == true) {
      this.usuariosService.ordenarID().subscribe(
        res => {
          let resultado: any = res;
          this.comentarios = res;
          this.flag = false;
          console.log(resultado.result);
        },
        err => console.log(err.error.message)
      )
    }
  }


  verificarComentario(com: string) {
    if (com.length == 0)
      return 1;
    if (com.length > 1000)
      return 2;
    return 0;
  }

  verificarForm(): boolean {
    this.errorComentario = this.verificarComentario(this.comentario.comentario);
    if (this.errorComentario > 0) {
      return false;
    }
    return true;
  }

  limpiarComentario() {
    if (this.errorComentario > 0) {
      console.log("Limpiar comentario");
      this.comentario.comentario = "";
      this.errorComentario = 0;
    }

  }

}
