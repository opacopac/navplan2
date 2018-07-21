import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOlComponentsContainerComponent } from './map-ol-components-container.component';

describe('MapOlComponentsContainerComponent', () => {
  let component: MapOlComponentsContainerComponent;
  let fixture: ComponentFixture<MapOlComponentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOlComponentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOlComponentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
