import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayWaypointComponent } from './map-overlay-waypoint.component';

describe('MapOverlayWaypointComponent', () => {
  let component: MapOverlayWaypointComponent;
  let fixture: ComponentFixture<MapOverlayWaypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayWaypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
