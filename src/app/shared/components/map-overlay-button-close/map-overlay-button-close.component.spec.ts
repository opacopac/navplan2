import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonCloseComponent } from './map-overlay-button-close.component';

describe('MapOverlayButtonCloseComponent', () => {
  let component: MapOverlayButtonCloseComponent;
  let fixture: ComponentFixture<MapOverlayButtonCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
