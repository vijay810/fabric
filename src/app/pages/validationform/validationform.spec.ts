import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Validationform } from './validationform';

describe('Validationform', () => {
  let component: Validationform;
  let fixture: ComponentFixture<Validationform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Validationform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Validationform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
