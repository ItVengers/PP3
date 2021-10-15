import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosRegistrarComponent } from './components/usuarios-registrar/usuarios-registrar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from './auth.guard'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuariosHabitacionesComponent } from './components/usuarios-habitaciones/usuarios-habitaciones.component';
import { UsuariosService } from './services/usuarios.service';
import { HomeComponent } from './components/home/home.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConstruccionComponent } from './components/construccion/construccion.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ListarHabitacionesComponent } from './components/listar-habitaciones/listar-habitaciones.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import { AdminReservasComponent } from './components/admin-reservas/admin-reservas.component';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios.component';
import { AdminHabitacionesComponent } from './components/admin-habitaciones/admin-habitaciones.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReservaFichaComponent } from './components/reserva-ficha/reserva-ficha.component';
import { UsuariosReservarComponent } from './components/usuarios-reservar/usuarios-reservar.component';
import { ConfirmarReservaComponent } from './components/confirmar-reserva/confirmar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosRegistrarComponent,
    InicioComponent,
    UsuariosHabitacionesComponent,
    HomeComponent,
    ComentariosComponent,
    ConstruccionComponent,
    ContactoComponent,
    ListarHabitacionesComponent,
    MisReservasComponent,
    MisDatosComponent,
    AdminReservasComponent,
    AdminUsuariosComponent,
    AdminHabitacionesComponent,
    ReservaFichaComponent,
    UsuariosReservarComponent,
    ConfirmarReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    NgbModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
