import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayRemoveFromRouteComponent } from './map-overlay-remove-from-route.component';

describe('MapOverlayRemoveFromRouteComponent', () => {
  let component: MapOverlayRemoveFromRouteComponent;
  let fixture: ComponentFixture<MapOverlayRemoveFromRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayRemoveFromRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayRemoveFromRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
