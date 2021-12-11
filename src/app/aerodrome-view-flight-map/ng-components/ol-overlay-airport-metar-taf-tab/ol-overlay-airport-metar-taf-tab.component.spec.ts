import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OlOverlayAirportMetarTafTabComponent} from './ol-overlay-airport-metar-taf-tab.component';

describe('OlOverlayAirportMetarTafTabComponent', () => {
  let component: OlOverlayAirportMetarTafTabComponent;
  let fixture: ComponentFixture<OlOverlayAirportMetarTafTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlOverlayAirportMetarTafTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayAirportMetarTafTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
