import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDesign } from './final-design';

describe('FinalDesign', () => {
  let component: FinalDesign;
  let fixture: ComponentFixture<FinalDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalDesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalDesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
