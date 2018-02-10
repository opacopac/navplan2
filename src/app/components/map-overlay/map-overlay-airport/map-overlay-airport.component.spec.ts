import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayAirportComponent } from './map-overlay-airport.component';

describe('MapOverlayAirportComponent', () => {
  let component: MapOverlayAirportComponent;
  let fixture: ComponentFixture<MapOverlayAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
