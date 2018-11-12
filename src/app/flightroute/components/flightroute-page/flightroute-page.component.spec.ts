import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightroutePageComponent } from './flightroute-page.component';

describe('FlightroutePageComponent', () => {
  let component: FlightroutePageComponent;
  let fixture: ComponentFixture<FlightroutePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightroutePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightroutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
