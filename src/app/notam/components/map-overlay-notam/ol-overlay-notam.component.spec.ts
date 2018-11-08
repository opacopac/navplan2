import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayNotamComponent } from './ol-overlay-notam.component';

describe('OlOverlayNotamComponent', () => {
  let component: OlOverlayNotamComponent;
  let fixture: ComponentFixture<OlOverlayNotamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayNotamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayNotamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
