import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosIngresarComponent } from './usuarios-ingresar.component';

describe('UsuariosIngresarComponent', () => {
  let component: UsuariosIngresarComponent;
  let fixture: ComponentFixture<UsuariosIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
