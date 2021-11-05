import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEgresosComponent } from './admin-egresos.component';

describe('AdminEgresosComponent', () => {
  let component: AdminEgresosComponent;
  let fixture: ComponentFixture<AdminEgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEgresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
