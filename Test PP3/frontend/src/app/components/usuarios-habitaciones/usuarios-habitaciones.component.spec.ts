import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosHabitacionesComponent } from './usuarios-habitaciones.component';

describe('UsuariosHabitacionesComponent', () => {
  let component: UsuariosHabitacionesComponent;
  let fixture: ComponentFixture<UsuariosHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosHabitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
