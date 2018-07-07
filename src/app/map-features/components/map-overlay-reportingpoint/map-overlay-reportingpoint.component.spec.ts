import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayReportingpointComponent } from './map-overlay-reportingpoint.component';

describe('MapOverlayReportingpointComponent', () => {
  let component: MapOverlayReportingpointComponent;
  let fixture: ComponentFixture<MapOverlayReportingpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayReportingpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayReportingpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
