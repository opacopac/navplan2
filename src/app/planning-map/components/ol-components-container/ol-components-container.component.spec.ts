import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlComponentsContainerComponent } from './ol-components-container.component';

describe('MapOlComponentsContainerComponent', () => {
  let component: OlComponentsContainerComponent;
  let fixture: ComponentFixture<OlComponentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlComponentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlComponentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
