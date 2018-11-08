import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayMeteogramComponent } from './ol-overlay-meteogram.component';

describe('MapOverlayMeteogramComponent', () => {
  let component: OlOverlayMeteogramComponent;
  let fixture: ComponentFixture<OlOverlayMeteogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayMeteogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayMeteogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
