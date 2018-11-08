import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonMetarTafComponent } from './ol-overlay-button-metar-taf.component';

describe('OlOverlayButtonMetarTafComponent', () => {
  let component: OlOverlayButtonMetarTafComponent;
  let fixture: ComponentFixture<OlOverlayButtonMetarTafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonMetarTafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonMetarTafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
