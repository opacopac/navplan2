import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteComponent } from './flightroute.component';

describe('FlightrouteComponent', () => {
  let component: FlightrouteComponent;
  let fixture: ComponentFixture<FlightrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
