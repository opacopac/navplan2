import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayAirportMeteoTabComponent } from './ol-overlay-airport-meteo-tab.component';

describe('OlOverlayAirportMeteoTabComponent', () => {
  let component: OlOverlayAirportMeteoTabComponent;
  let fixture: ComponentFixture<OlOverlayAirportMeteoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayAirportMeteoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayAirportMeteoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
