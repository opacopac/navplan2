import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEnvelopeListComponent} from './aircraft-wnb-envelope-list.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWnbEnvelopeListComponent;
    let fixture: ComponentFixture<AircraftWnbEnvelopeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEnvelopeListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEnvelopeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
