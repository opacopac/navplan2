import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonMetarTafComponent } from './map-overlay-button-metar-taf.component';

describe('MapOverlayButtonMetarTafComponent', () => {
  let component: MapOverlayButtonMetarTafComponent;
  let fixture: ComponentFixture<MapOverlayButtonMetarTafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonMetarTafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonMetarTafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
