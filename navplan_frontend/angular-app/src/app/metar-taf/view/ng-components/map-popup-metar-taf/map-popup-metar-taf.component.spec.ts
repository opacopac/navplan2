import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapPopupMetarTafComponent} from './map-popup-metar-taf.component';

describe('OlOverlayAirportMetarTafTabComponent', () => {
  let component: MapPopupMetarTafComponent;
  let fixture: ComponentFixture<MapPopupMetarTafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPopupMetarTafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPopupMetarTafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
