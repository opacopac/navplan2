import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonAddToRouteComponent } from './map-overlay-button-add-to-route.component';

describe('MapOverlayButtonAddToRouteComponent', () => {
  let component: MapOverlayButtonAddToRouteComponent;
  let fixture: ComponentFixture<MapOverlayButtonAddToRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonAddToRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonAddToRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
