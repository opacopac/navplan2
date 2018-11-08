import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonRemoveFromRouteComponent } from './ol-overlay-button-remove-from-route.component';

describe('MapOverlayButtonRemoveFromRouteComponent', () => {
  let component: OlOverlayButtonRemoveFromRouteComponent;
  let fixture: ComponentFixture<OlOverlayButtonRemoveFromRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonRemoveFromRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonRemoveFromRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
