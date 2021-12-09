import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeteoSmaContainerComponent} from './meteo-sma-container.component';

describe('VerticalMapComponent', () => {
  let component: MeteoSmaContainerComponent;
  let fixture: ComponentFixture<MeteoSmaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteoSmaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoSmaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
