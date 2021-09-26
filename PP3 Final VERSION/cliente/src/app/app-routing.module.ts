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
import { ContactoComponent } from './components/contacto/contacto.component';
import { ListarHabitacionesComponent } from './components/listar-habitaciones/listar-habitaciones.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { AdminReservasComponent } from './components/admin-reservas/admin-reservas.component';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios.component';
import { AdminHabitacionesComponent } from './components/admin-habitaciones/admin-habitaciones.component';
import { ReservaFichaComponent } from './components/reserva-ficha/reserva-ficha.component';


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
  // {
  //   path: 'admin/habitaciones',
  //   component: UsuariosHabitacionesComponent,
  //   canActivate: [AuthGuard]
  // },
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
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'usuarios/listarhabitaciones',
    component: ListarHabitacionesComponent,
  },
  {
    path: 'usuarios/misdatos',
    component: MisDatosComponent,
  },
  {
    path: 'usuarios/misreservas',
    component: MisReservasComponent,
  },
  {
    path: 'admin/reservas',
    component: AdminReservasComponent,
  },
  {
    path: 'admin/usuarios',
    component: AdminUsuariosComponent,
  },
  {
    path: 'admin/habitaciones',
    component: AdminHabitacionesComponent,
  },
  {
    path: 'datosreserva/:idReserva',
    component: ReservaFichaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
