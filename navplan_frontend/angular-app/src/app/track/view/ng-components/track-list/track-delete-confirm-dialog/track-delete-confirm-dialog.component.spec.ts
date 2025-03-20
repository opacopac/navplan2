import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackDeleteConfirmDialogComponent} from './track-delete-confirm-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: TrackDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<TrackDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackDeleteConfirmDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
