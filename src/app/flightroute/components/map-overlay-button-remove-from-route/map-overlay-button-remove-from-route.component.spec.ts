import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonRemoveFromRouteComponent } from './map-overlay-button-remove-from-route.component';

describe('MapOverlayButtonRemoveFromRouteComponent', () => {
  let component: MapOverlayButtonRemoveFromRouteComponent;
  let fixture: ComponentFixture<MapOverlayButtonRemoveFromRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonRemoveFromRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonRemoveFromRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
