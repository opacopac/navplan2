import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayMeteogramComponent } from './map-overlay-meteogram.component';

describe('MapOverlayMeteogramComponent', () => {
  let component: MapOverlayMeteogramComponent;
  let fixture: ComponentFixture<MapOverlayMeteogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayMeteogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayMeteogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
