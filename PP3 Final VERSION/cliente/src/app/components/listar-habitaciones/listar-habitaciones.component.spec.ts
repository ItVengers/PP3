import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHabitacionesComponent } from './listar-habitaciones.component';

describe('ListarHabitacionesComponent', () => {
  let component: ListarHabitacionesComponent;
  let fixture: ComponentFixture<ListarHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHabitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
