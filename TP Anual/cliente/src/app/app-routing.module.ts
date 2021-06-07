import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosIngresarComponent} from "./components/usuarios-ingresar/usuarios-ingresar.component"
import {InicioComponent} from "./components/inicio/inicio.component";

const routes: Routes = [
  {
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
  {
		path: 'usuarios/inicio',
		component: InicioComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
