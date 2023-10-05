import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerSelectionComponent} from './layer-selection.component';

describe('LayerSelectionComponent', () => {
  let component: LayerSelectionComponent;
  let fixture: ComponentFixture<LayerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
