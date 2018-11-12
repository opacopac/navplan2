import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalcTableComponent } from './fuel-calc-table.component';

describe('FuelCalcTableComponent', () => {
  let component: FuelCalcTableComponent;
  let fixture: ComponentFixture<FuelCalcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelCalcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCalcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
