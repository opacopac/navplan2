import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMapPageComponent } from './chart-map-page.component';

describe('ChartMapPageComponent', () => {
  let component: ChartMapPageComponent;
  let fixture: ComponentFixture<ChartMapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
