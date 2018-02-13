import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonWebcamComponent } from './map-overlay-button-webcam.component';

describe('MapOverlayButtonWebcamComponent', () => {
  let component: MapOverlayButtonWebcamComponent;
  let fixture: ComponentFixture<MapOverlayButtonWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
