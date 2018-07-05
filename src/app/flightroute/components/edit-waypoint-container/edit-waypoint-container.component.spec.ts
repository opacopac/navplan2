import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaypointContainerComponent } from './edit-waypoint-container.component';

describe('EditWaypointContainerComponent', () => {
  let component: EditWaypointContainerComponent;
  let fixture: ComponentFixture<EditWaypointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWaypointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWaypointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
