import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteFormComponent } from './flightroute-form.component';

describe('FlightrouteFormComponent', () => {
  let component: FlightrouteFormComponent;
  let fixture: ComponentFixture<FlightrouteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
