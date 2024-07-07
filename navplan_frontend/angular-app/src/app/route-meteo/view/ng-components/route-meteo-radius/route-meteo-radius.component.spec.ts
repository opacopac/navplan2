import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouteMeteoRadiusComponent} from './route-meteo-radius.component';

describe('RouteMeteoContainerComponent', () => {
  let component: RouteMeteoRadiusComponent;
  let fixture: ComponentFixture<RouteMeteoRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMeteoRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMeteoRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
