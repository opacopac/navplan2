import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouteMeteoContainerComponent} from './route-meteo-container.component';

describe('RouteMeteoContainerComponent', () => {
  let component: RouteMeteoContainerComponent;
  let fixture: ComponentFixture<RouteMeteoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMeteoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMeteoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
