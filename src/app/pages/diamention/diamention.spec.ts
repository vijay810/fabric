import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diamention } from './diamention';

describe('Diamention', () => {
  let component: Diamention;
  let fixture: ComponentFixture<Diamention>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diamention]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diamention);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
