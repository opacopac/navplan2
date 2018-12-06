import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayAirportNotamTabComponent } from './ol-overlay-airport-notam-tab.component';

describe('OlOverlayAirportNotamTabComponent', () => {
  let component: OlOverlayAirportNotamTabComponent;
  let fixture: ComponentFixture<OlOverlayAirportNotamTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayAirportNotamTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayAirportNotamTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
