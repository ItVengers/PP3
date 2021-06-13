import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosIngresarComponent } from "./components/usuarios-ingresar/usuarios-ingresar.component"
import { InicioComponent } from "./components/inicio/inicio.component";
import { UsuariosHabitacionesComponent } from "./components/usuarios-habitaciones/usuarios-habitaciones.component";
import { AuthGuard } from './auth.guard';
import { UsuariosRegistrarComponent } from "./components/usuarios-registrar/usuarios-registrar.component"

const routes: Routes = [
  {
    path: 'usuarios/ingresar',
    component: UsuariosIngresarComponent
  },
  {
    path: 'usuarios/inicio',
    component: InicioComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'usuarios/habitaciones',
    component: UsuariosHabitacionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios/registrar',
    component: UsuariosRegistrarComponent
  },
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
];
/*
*****************************************
AGREGAR VALIDACION TOKEN DEL LADO DEL SERVIDOR
*****************************************
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
