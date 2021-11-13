import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerHabitacionesComponent } from './admin-ver-habitaciones.component';

describe('AdminVerHabitacionesComponent', () => {
  let component: AdminVerHabitacionesComponent;
  let fixture: ComponentFixture<AdminVerHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVerHabitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVerHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
