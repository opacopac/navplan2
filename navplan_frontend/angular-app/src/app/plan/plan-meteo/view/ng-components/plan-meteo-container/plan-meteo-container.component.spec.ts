import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanMeteoContainerComponent} from './plan-meteo-container.component';

describe('RouteMeteoContainerComponent', () => {
  let component: PlanMeteoContainerComponent;
  let fixture: ComponentFixture<PlanMeteoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanMeteoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMeteoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
