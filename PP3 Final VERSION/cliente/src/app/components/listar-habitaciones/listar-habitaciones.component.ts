import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
// import {DataViewModule} from 'primeng/dataview';

@Component({
    selector: 'app-listar-habitaciones',
    templateUrl: './listar-habitaciones.component.html',
    styleUrls: ['./listar-habitaciones.component.css']
  })
  export class ListarHabitacionesComponent implements OnInit {
    habitaciones:any = [];
    revelar:boolean = true;
  
    constructor(private usuariosService:UsuariosService){	}
  
    ngOnInit(){
          this.usuariosService.listarHabitaciones().subscribe(
              res => { 
          this.habitaciones = res; 
          console.log(res)
        },      
              err => console.log(err)
          )
      }

  }
// import {Injectable} from 'angular2/core';
// import {Http, Response} from 'angular2/http';
// import {Car} from '../domain/car';

// @Injectable()
// export class CarService {

//     constructor(private http: Http) {}

//     getCarsLarge() {
//         return this.http.get('/showcase/resources/data/cars-large.json')
//                     .toPromise()
//                     .then(res => <Car[]> res.json().data)
//                     .then(data => { return data; });
//     }
// }




