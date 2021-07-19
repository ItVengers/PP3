import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, NavigationExtras } from '@angular/router'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  login_: boolean = false;
  admin_: boolean = false;
  isNavbarCollapsed = true;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.subscribe(log => {
      this.login_ = true;
    });
    this.usuariosService.admin$.subscribe(log => {
      this.admin_ = true;
    });
  }

  logout() {
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.usuariosService.logOut();
    this.login_ = false;
    this.admin_ = false;
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
