import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgotPwStep1FormComponent} from './forgot-pw-step1-form.component';


xdescribe('ForgotPwStep1FormComponent', () => {
    let component: ForgotPwStep1FormComponent;
    let fixture: ComponentFixture<ForgotPwStep1FormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPwStep1FormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPwStep1FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
