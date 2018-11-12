import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayContainerComponent } from './ol-overlay-container.component';

describe('MapOverlayContainerComponent', () => {
  let component: OlOverlayContainerComponent;
  let fixture: ComponentFixture<OlOverlayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
