import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayReportingpointComponent } from './ol-overlay-reportingpoint.component';

describe('MapOverlayReportingpointComponent', () => {
  let component: OlOverlayReportingpointComponent;
  let fixture: ComponentFixture<OlOverlayReportingpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayReportingpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayReportingpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
