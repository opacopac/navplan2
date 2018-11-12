import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMapPageComponent } from './nav-map-page.component';

describe('MapContainerComponent', () => {
  let component: NavMapPageComponent;
  let fixture: ComponentFixture<NavMapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
