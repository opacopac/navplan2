import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonRemoveAlternateComponent } from './map-overlay-button-remove-alternate.component';

describe('MapOverlayButtonRemoveAlternateComponent', () => {
  let component: MapOverlayButtonRemoveAlternateComponent;
  let fixture: ComponentFixture<MapOverlayButtonRemoveAlternateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonRemoveAlternateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonRemoveAlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
