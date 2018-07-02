import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightrouteExportButtonsComponent } from './flightroute-export-buttons.component';

describe('FlightrouteExportButtonsComponent', () => {
  let component: FlightrouteExportButtonsComponent;
  let fixture: ComponentFixture<FlightrouteExportButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightrouteExportButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightrouteExportButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
