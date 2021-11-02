import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngresosComponent } from './admin-ingresos.component';

describe('AdminIngresosComponent', () => {
  let component: AdminIngresosComponent;
  let fixture: ComponentFixture<AdminIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
