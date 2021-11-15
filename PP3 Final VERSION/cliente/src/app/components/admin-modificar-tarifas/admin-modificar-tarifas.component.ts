import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MessageService } from 'primeng/api';
import { concat } from 'rxjs';



@Component({
  selector: 'app-admin-modificar-tarifas',
  templateUrl: './admin-modificar-tarifas.component.html',
  styleUrls: ['./admin-modificar-tarifas.component.css'],
  providers: [MessageService]
})
export class AdminModificarTarifasComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.traerHoteles();
    this.traerTemporadas();
    this.traerCategorias();
  }
  hoteles: any = [];
  temporadas: any = [];
  categorias: any = [];
  datos = { categoria: "", hotel: "", temporada: "", ajuste: "" };
  ajuste: any = [];
  selectedHot: string = 'Hotel Sur Centro';
  selectedTemp: string = 'Baja';



  selectChangeHandler(event: any) {
    this.selectedHot = event.target.value;
  }

  selectChangeHandler2(event: any) {
    this.selectedTemp = event.target.value;
  }

  traerHoteles() {
    this.usuariosService.listarHoteles().subscribe(
      (res) => {
        this.hoteles = res;
        console.log(this.hoteles);
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

  traerTemporadas() {
    this.usuariosService.listarTemporadas().subscribe(
      (res) => {
        this.temporadas = res;
        console.log(this.temporadas);
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

  traerCategorias() {
    this.usuariosService.listarCategorias().subscribe(
      (res) => {
        this.categorias = res;
        console.log(this.temporadas);
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


  ajustar(datosAjuste: any, i: number) {
    var valor: string = "";

    if (this.ajuste[i] >= 1 && this.ajuste[i] < 10) {
      valor = "0.0";
      valor = valor.concat(this.ajuste[i]);
      console.log(valor);
    }
    if (this.ajuste[i] >= 10 && this.ajuste[i] < 100) {
      valor = "0.";
      valor = valor.concat(this.ajuste[i]);
      console.log(valor);
    }

    if (this.ajuste[i] == 100) {
      valor = "1";
      console.log(valor);
    }
    if (this.ajuste[i] < -100 && this.ajuste[i] >= -10) {
      let abs: number = Math.abs(this.ajuste[i]);
      valor = "-0.";
      valor = valor.concat(abs.toString());
      console.log(valor);
    }
    if (this.ajuste[i] < -10 && this.ajuste[i] >= -1) {
      let abs: number = Math.abs(this.ajuste[i]);
      valor = "-0.0";
      valor = valor.concat(abs.toString());
      console.log(valor);
    }
    if (this.ajuste[i] == -100) {
      valor = "-1";
      console.log(valor);
    }

    if (this.ajuste[i] < -100 || this.ajuste[i] > 100) {
      valor = "0";
      console.log(valor);
    }

    this.datos.categoria = datosAjuste.descripcion;
    this.datos.hotel = this.selectedHot;
    this.datos.temporada = this.selectedTemp;
    this.datos.ajuste = valor;

    console.log(this.datos.temporada);


    this.usuariosService.aplicarAjuste(this.datos).subscribe(
      (res) => {
        window.alert(res);
        this.ngOnInit();
        this.ajuste = [];
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
}