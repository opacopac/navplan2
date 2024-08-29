import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AircraftWnbEditEnvelopeDefinitionDialogComponent
} from './aircraft-wnb-edit-envelope-definition-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditEnvelopeDefinitionDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeDefinitionDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeDefinitionDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeDefinitionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
