import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayWindyiframeComponent } from './map-overlay-windyiframe.component';

describe('MapOverlayWindyiframeComponent', () => {
  let component: MapOverlayWindyiframeComponent;
  let fixture: ComponentFixture<MapOverlayWindyiframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayWindyiframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayWindyiframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
