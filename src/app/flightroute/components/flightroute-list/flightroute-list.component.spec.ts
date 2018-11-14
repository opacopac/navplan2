import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteListComponent } from './flightroute-list.component';

describe('FlightrouteListComponent', () => {
  let component: FlightrouteListComponent;
  let fixture: ComponentFixture<FlightrouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
