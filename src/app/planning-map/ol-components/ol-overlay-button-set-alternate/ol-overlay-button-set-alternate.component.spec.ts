import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonSetAlternateComponent } from './ol-overlay-button-set-alternate.component';

describe('MapOverlayButtonSetAlternateComponent', () => {
  let component: OlOverlayButtonSetAlternateComponent;
  let fixture: ComponentFixture<OlOverlayButtonSetAlternateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonSetAlternateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonSetAlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
