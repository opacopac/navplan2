import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayReportingsectorComponent } from './ol-overlay-reportingsector.component';

describe('MapOverlayReportingsectorComponent', () => {
  let component: OlOverlayReportingsectorComponent;
  let fixture: ComponentFixture<OlOverlayReportingsectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayReportingsectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayReportingsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
