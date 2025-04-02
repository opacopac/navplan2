import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackProfileTimesComponent} from './track-profile-times.component';


xdescribe('TracksPageComponent', () => {
    let component: TrackProfileTimesComponent;
    let fixture: ComponentFixture<TrackProfileTimesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackProfileTimesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackProfileTimesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
