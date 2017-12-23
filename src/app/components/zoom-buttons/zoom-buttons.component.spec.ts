import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomButtonsComponent } from './zoom-buttons.component';

describe('ZoomButtonsComponent', () => {
  let component: ZoomButtonsComponent;
  let fixture: ComponentFixture<ZoomButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
