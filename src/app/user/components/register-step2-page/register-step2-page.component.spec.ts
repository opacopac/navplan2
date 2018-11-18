import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStep2PageComponent } from './register-step2-page.component';

describe('RegisterStep2PageComponent', () => {
  let component: RegisterStep2PageComponent;
  let fixture: ComponentFixture<RegisterStep2PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStep2PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStep2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
