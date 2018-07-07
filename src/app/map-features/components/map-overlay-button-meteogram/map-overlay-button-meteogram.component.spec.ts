import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonMeteogramComponent } from './map-overlay-button-meteogram.component';

describe('MapOverlayButtonMeteogramComponent', () => {
  let component: MapOverlayButtonMeteogramComponent;
  let fixture: ComponentFixture<MapOverlayButtonMeteogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonMeteogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonMeteogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
