import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayGeonameComponent } from './map-overlay-geoname.component';

describe('MapOverlayGeonameComponent', () => {
  let component: MapOverlayGeonameComponent;
  let fixture: ComponentFixture<MapOverlayGeonameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayGeonameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayGeonameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
