import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlMapContainerComponent } from './ol-map-container.component';

describe('MapContainerComponent', () => {
  let component: OlMapContainerComponent;
  let fixture: ComponentFixture<OlMapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlMapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
