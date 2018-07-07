import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayReportingsectorComponent } from './map-overlay-reportingsector.component';

describe('MapOverlayReportingsectorComponent', () => {
  let component: MapOverlayReportingsectorComponent;
  let fixture: ComponentFixture<MapOverlayReportingsectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayReportingsectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayReportingsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
