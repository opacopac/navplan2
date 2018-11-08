import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMapPageComponent } from './planning-map-page.component';

describe('MapContainerComponent', () => {
  let component: PlanningMapPageComponent;
  let fixture: ComponentFixture<PlanningMapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningMapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
