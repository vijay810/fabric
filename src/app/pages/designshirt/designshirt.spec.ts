import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Designshirt } from './designshirt';

describe('Designshirt', () => {
  let component: Designshirt;
  let fixture: ComponentFixture<Designshirt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Designshirt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Designshirt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
