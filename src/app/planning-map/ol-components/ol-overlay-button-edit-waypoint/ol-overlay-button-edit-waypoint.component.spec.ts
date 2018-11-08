import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonEditWaypointComponent } from './ol-overlay-button-edit-waypoint.component';

describe('MapOverlayButtonEditWaypointComponent', () => {
  let component: OlOverlayButtonEditWaypointComponent;
  let fixture: ComponentFixture<OlOverlayButtonEditWaypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonEditWaypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonEditWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
