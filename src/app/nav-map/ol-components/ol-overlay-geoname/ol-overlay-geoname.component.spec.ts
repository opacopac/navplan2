import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayGeonameComponent } from './ol-overlay-geoname.component';

describe('MapOverlayGeonameComponent', () => {
  let component: OlOverlayGeonameComponent;
  let fixture: ComponentFixture<OlOverlayGeonameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayGeonameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayGeonameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
