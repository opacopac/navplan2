import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpwComponent } from './forgotpw.component';

describe('ForgotpwComponent', () => {
  let component: ForgotpwComponent;
  let fixture: ComponentFixture<ForgotpwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
