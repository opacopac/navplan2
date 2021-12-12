import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouteMeteoTableComponent} from './route-meteo-table.component';

describe('RouteMeteoContainerComponent', () => {
  let component: RouteMeteoTableComponent;
  let fixture: ComponentFixture<RouteMeteoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMeteoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMeteoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
