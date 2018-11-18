import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStep1FormComponent } from './register-step1-form.component';

describe('RegisterStep1FormComponent', () => {
  let component: RegisterStep1FormComponent;
  let fixture: ComponentFixture<RegisterStep1FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStep1FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStep1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
