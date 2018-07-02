import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalculationComponent } from './fuel-calculation.component';

describe('FuelCalculationComponent', () => {
  let component: FuelCalculationComponent;
  let fixture: ComponentFixture<FuelCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
