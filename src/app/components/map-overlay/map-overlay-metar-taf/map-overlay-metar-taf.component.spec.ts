import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayMetarTafComponent } from './map-overlay-metar-taf.component';

describe('MapOverlayMetarTafComponent', () => {
  let component: MapOverlayMetarTafComponent;
  let fixture: ComponentFixture<MapOverlayMetarTafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayMetarTafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayMetarTafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
