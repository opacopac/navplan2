import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AircraftWnbEditEnvelopeCoordinateFormDialogComponent
} from './aircraft-wnb-edit-envelope-coordinate-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditEnvelopeCoordinateFormDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeCoordinateFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeCoordinateFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeCoordinateFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
