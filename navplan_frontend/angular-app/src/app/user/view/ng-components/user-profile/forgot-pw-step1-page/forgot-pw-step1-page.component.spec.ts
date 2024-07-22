import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgotPwStep1PageComponent} from './forgot-pw-step1-page.component';


xdescribe('ForgotPwStep1PageComponent', () => {
    let component: ForgotPwStep1PageComponent;
    let fixture: ComponentFixture<ForgotPwStep1PageComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ForgotPwStep1PageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPwStep1PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
