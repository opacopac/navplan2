import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AircraftWnbEditEnvelopeCoordinateDialogComponent
} from './aircraft-wnb-edit-envelope-coordinate-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditEnvelopeCoordinateDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeCoordinateDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeCoordinateDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeCoordinateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
