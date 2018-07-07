import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayButtonEditUserpointComponent } from './map-overlay-button-edit-userpoint.component';

describe('MapOverlayButtonEditUserpointComponent', () => {
  let component: MapOverlayButtonEditUserpointComponent;
  let fixture: ComponentFixture<MapOverlayButtonEditUserpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayButtonEditUserpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayButtonEditUserpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
