import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayEditWaypointComponent } from './map-overlay-edit-waypoint.component';

describe('MapOverlayEditWaypointComponent', () => {
  let component: MapOverlayEditWaypointComponent;
  let fixture: ComponentFixture<MapOverlayEditWaypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayEditWaypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayEditWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
