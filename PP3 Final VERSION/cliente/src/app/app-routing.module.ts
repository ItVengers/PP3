import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosIngresarComponent } from "./components/usuarios-ingresar/usuarios-ingresar.component"
import { InicioComponent } from "./components/inicio/inicio.component";
import { UsuariosHabitacionesComponent } from "./components/usuarios-habitaciones/usuarios-habitaciones.component";
import { AuthGuard } from './auth.guard';
import { UsuariosRegistrarComponent } from "./components/usuarios-registrar/usuarios-registrar.component"
import { HomeComponent } from "./components/home/home.component"
import { ComentariosComponent } from "./components/comentarios/comentarios.component"
import { ConstruccionComponent } from './components/construccion/construccion.component';


const routes: Routes = [
  {
    path: 'usuarios/ingresar',
    component: UsuariosIngresarComponent
  },
  {
    path: 'usuarios/inicio',
    component: InicioComponent,

  },
  {
    path: 'usuarios/habitaciones',
    component: UsuariosHabitacionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/habitaciones',
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
  {
    path: 'admin/home',
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'usuarios/home',
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'usuarios/comentarios',
    component: ComentariosComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'admin/comentarios',
    component: ComentariosComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'construccion',
    component: ConstruccionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
