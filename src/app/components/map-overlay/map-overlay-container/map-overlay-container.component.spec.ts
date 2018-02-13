import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOverlayContainerComponent } from './map-overlay-container.component';

describe('MapOverlayContainerComponent', () => {
  let component: MapOverlayContainerComponent;
  let fixture: ComponentFixture<MapOverlayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOverlayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
