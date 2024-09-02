import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AircraftWnbEditEnvelopeDefinitionFormDialogComponent
} from './aircraft-wnb-edit-envelope-definition-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditEnvelopeDefinitionFormDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeDefinitionFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeDefinitionFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeDefinitionFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
