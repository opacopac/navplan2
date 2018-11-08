import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayWaypointComponent } from './ol-overlay-waypoint.component';

describe('MapOverlayWaypointComponent', () => {
  let component: OlOverlayWaypointComponent;
  let fixture: ComponentFixture<OlOverlayWaypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayWaypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
