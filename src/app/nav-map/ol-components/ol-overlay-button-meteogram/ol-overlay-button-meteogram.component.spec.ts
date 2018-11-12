import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonMeteogramComponent } from './ol-overlay-button-meteogram.component';

describe('MapOverlayButtonMeteogramComponent', () => {
  let component: OlOverlayButtonMeteogramComponent;
  let fixture: ComponentFixture<OlOverlayButtonMeteogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonMeteogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonMeteogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
