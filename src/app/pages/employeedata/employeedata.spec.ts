import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeedata } from './employeedata';

describe('Employeedata', () => {
  let component: Employeedata;
  let fixture: ComponentFixture<Employeedata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeedata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeedata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
