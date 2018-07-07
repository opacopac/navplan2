import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayUserpointComponent } from './map-overlay-userpoint.component';

describe('MapOverlayUserpointComponent', () => {
  let component: MapOverlayUserpointComponent;
  let fixture: ComponentFixture<MapOverlayUserpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayUserpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayUserpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
