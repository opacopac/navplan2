import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapLayerSelectionContentComponent} from './map-layer-selection-content.component';

describe('LayerSelectionComponent', () => {
  let component: MapLayerSelectionContentComponent;
  let fixture: ComponentFixture<MapLayerSelectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLayerSelectionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLayerSelectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
