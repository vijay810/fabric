import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnesideDesign } from './oneside-design';

describe('OnesideDesign', () => {
  let component: OnesideDesign;
  let fixture: ComponentFixture<OnesideDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnesideDesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnesideDesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
