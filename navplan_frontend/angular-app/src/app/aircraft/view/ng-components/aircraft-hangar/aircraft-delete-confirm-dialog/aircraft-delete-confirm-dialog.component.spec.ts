import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftDeleteConfirmDialogComponent} from './aircraft-delete-confirm-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<AircraftDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftDeleteConfirmDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
