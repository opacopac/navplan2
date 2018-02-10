import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayNavaidComponent } from './map-overlay-navaid.component';

describe('MapOverlayNavaidComponent', () => {
  let component: MapOverlayNavaidComponent;
  let fixture: ComponentFixture<MapOverlayNavaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayNavaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayNavaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
