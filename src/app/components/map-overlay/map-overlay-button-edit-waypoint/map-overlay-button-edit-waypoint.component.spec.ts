import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonEditWaypointComponent } from './map-overlay-button-edit-waypoint.component';

describe('MapOverlayButtonEditWaypointComponent', () => {
  let component: MapOverlayButtonEditWaypointComponent;
  let fixture: ComponentFixture<MapOverlayButtonEditWaypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonEditWaypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonEditWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
