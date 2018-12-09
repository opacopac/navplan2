import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditWaypointDialogComponent} from './edit-waypoint-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: EditWaypointDialogComponent;
    let fixture: ComponentFixture<EditWaypointDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditWaypointDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditWaypointDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
