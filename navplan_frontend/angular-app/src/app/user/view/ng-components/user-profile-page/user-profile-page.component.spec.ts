import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserProfilePageComponent} from './user-profile-page.component';


xdescribe('UserProfilePageComponent', () => {
    let component: UserProfilePageComponent;
    let fixture: ComponentFixture<UserProfilePageComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [UserProfilePageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
