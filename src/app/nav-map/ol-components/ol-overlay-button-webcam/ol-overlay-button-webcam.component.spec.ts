import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonWebcamComponent } from './ol-overlay-button-webcam.component';

describe('MapOverlayButtonWebcamComponent', () => {
  let component: OlOverlayButtonWebcamComponent;
  let fixture: ComponentFixture<OlOverlayButtonWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
