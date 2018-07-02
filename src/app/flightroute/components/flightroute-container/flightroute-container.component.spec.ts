import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteContainerComponent } from './flightroute-container.component';

describe('FlightrouteContainerComponent', () => {
  let component: FlightrouteContainerComponent;
  let fixture: ComponentFixture<FlightrouteContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
