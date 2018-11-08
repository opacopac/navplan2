import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayNavaidComponent } from './ol-overlay-navaid.component';

describe('MapOverlayNavaidComponent', () => {
  let component: OlOverlayNavaidComponent;
  let fixture: ComponentFixture<OlOverlayNavaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayNavaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayNavaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
