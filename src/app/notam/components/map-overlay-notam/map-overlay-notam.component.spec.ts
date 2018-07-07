import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayNotamComponent } from './map-overlay-notam.component';

describe('MapOverlayNotamComponent', () => {
  let component: MapOverlayNotamComponent;
  let fixture: ComponentFixture<MapOverlayNotamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayNotamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayNotamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
