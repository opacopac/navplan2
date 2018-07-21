import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlighttimerComponent } from './flighttimer.component';

describe('FlighttimerComponent', () => {
  let component: FlighttimerComponent;
  let fixture: ComponentFixture<FlighttimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlighttimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlighttimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});