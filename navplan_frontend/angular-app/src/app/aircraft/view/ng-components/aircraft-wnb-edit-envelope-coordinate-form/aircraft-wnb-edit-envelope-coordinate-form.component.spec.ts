import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditEnvelopeCoordinateFormComponent} from './aircraft-wnb-edit-envelope-coordinate-form.component';


xdescribe('EditWaypointFormComponent', () => {
    let component: AircraftWnbEditEnvelopeCoordinateFormComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeCoordinateFormComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeCoordinateFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeCoordinateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
