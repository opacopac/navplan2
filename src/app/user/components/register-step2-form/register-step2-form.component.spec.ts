import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStep2FormComponent } from './register-step2-form.component';

describe('RegisterStep2FormComponent', () => {
  let component: RegisterStep2FormComponent;
  let fixture: ComponentFixture<RegisterStep2FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStep2FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStep2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
