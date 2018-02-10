import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayAddToRouteComponent } from './map-overlay-add-to-route.component';

describe('MapOverlayAddToRouteComponent', () => {
  let component: MapOverlayAddToRouteComponent;
  let fixture: ComponentFixture<MapOverlayAddToRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayAddToRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayAddToRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
