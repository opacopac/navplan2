import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointlistComponent } from './waypointlist.component';

describe('WaypointlistComponent', () => {
  let component: WaypointlistComponent;
  let fixture: ComponentFixture<WaypointlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaypointlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
