import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayTrafficComponent } from './map-overlay-traffic.component';

describe('MapOverlayTrafficComponent', () => {
  let component: MapOverlayTrafficComponent;
  let fixture: ComponentFixture<MapOverlayTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
