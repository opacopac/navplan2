import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonSetAlternateComponent } from './map-overlay-button-set-alternate.component';

describe('MapOverlayButtonSetAlternateComponent', () => {
  let component: MapOverlayButtonSetAlternateComponent;
  let fixture: ComponentFixture<MapOverlayButtonSetAlternateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonSetAlternateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonSetAlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
