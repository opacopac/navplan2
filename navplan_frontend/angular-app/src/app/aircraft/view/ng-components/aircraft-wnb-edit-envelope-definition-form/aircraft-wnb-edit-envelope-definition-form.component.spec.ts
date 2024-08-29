import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditEnvelopeDefinitionFormComponent} from './aircraft-wnb-edit-envelope-definition-form.component';


xdescribe('EditWaypointFormComponent', () => {
    let component: AircraftWnbEditEnvelopeDefinitionFormComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeDefinitionFormComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeDefinitionFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeDefinitionFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
