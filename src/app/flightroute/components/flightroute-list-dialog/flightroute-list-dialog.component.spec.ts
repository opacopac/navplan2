import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteListDialogComponent } from './flightroute-list-dialog.component';

describe('FlightrouteListDialogComponent', () => {
  let component: FlightrouteListDialogComponent;
  let fixture: ComponentFixture<FlightrouteListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
