import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOverlayButtonListComponent } from './ol-overlay-button-list.component';

describe('OlOverlayButtonListComponent', () => {
  let component: OlOverlayButtonListComponent;
  let fixture: ComponentFixture<OlOverlayButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlOverlayButtonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOverlayButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
