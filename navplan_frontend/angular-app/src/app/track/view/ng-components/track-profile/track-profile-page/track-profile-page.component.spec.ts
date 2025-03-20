import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackProfilePageComponent} from './track-profile-page.component';


xdescribe('TracksPageComponent', () => {
    let component: TrackProfilePageComponent;
    let fixture: ComponentFixture<TrackProfilePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackProfilePageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
