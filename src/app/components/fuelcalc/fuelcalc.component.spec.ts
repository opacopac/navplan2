import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelcalcComponent } from './fuelcalc.component';

describe('FuelcalcComponent', () => {
  let component: FuelcalcComponent;
  let fixture: ComponentFixture<FuelcalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelcalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
