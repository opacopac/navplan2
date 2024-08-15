import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditEnvelopeComponent} from './aircraft-wnb-edit-envelope.component';


xdescribe('FuelCalcContainerComponent', () => {
    let component: AircraftWnbEditEnvelopeComponent;
    let fixture: ComponentFixture<AircraftWnbEditEnvelopeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditEnvelopeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditEnvelopeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
