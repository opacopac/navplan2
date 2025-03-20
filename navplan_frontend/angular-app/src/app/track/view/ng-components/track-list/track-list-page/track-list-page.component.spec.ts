import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackListPageComponent} from './track-list-page.component';


xdescribe('TracksPageComponent', () => {
    let component: TrackListPageComponent;
    let fixture: ComponentFixture<TrackListPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackListPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
