import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayCloseComponent } from './map-overlay-close.component';

describe('MapOverlayCloseComponent', () => {
  let component: MapOverlayCloseComponent;
  let fixture: ComponentFixture<MapOverlayCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
