import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanMeteoTableComponent} from './plan-meteo-table.component';

describe('RouteMeteoContainerComponent', () => {
  let component: PlanMeteoTableComponent;
  let fixture: ComponentFixture<PlanMeteoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanMeteoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMeteoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
