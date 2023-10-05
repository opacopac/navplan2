import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgotPwStep2PageComponent} from './forgot-pw-step2-page.component';


xdescribe('ForgotPwStep2PageComponent', () => {
    let component: ForgotPwStep2PageComponent;
    let fixture: ComponentFixture<ForgotPwStep2PageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPwStep2PageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPwStep2PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
