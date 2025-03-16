import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackEditFormDialogComponent} from './track-edit-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: TrackEditFormDialogComponent;
    let fixture: ComponentFixture<TrackEditFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackEditFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackEditFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
