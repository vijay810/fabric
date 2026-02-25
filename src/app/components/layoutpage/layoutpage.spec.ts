import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutpage } from './layoutpage';

describe('Layoutpage', () => {
  let component: Layoutpage;
  let fixture: ComponentFixture<Layoutpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layoutpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
