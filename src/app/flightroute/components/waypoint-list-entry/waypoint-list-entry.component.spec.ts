import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointListEntryComponent } from './waypoint-list-entry.component';

describe('WaypointListEntryComponent', () => {
  let component: WaypointListEntryComponent;
  let fixture: ComponentFixture<WaypointListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaypointListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
