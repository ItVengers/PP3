import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModificarTarifasComponent } from './admin-modificar-tarifas.component';

describe('AdminModificarTarifasComponent', () => {
  let component: AdminModificarTarifasComponent;
  let fixture: ComponentFixture<AdminModificarTarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModificarTarifasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModificarTarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
