import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgotPwStep2FormComponent} from './forgot-pw-step2-form.component';


xdescribe('ForgotPwStep2FormComponent', () => {
    let component: ForgotPwStep2FormComponent;
    let fixture: ComponentFixture<ForgotPwStep2FormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPwStep2FormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPwStep2FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
