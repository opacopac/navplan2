import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanMeteoRadiusComponent} from './plan-meteo-radius.component';

describe('RouteMeteoContainerComponent', () => {
  let component: PlanMeteoRadiusComponent;
  let fixture: ComponentFixture<PlanMeteoRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanMeteoRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMeteoRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
