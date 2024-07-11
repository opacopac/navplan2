import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteAircraftSpeedComponent} from './flightroute-aircraft-speed.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FlightrouteAircraftSpeedComponent;
    let fixture: ComponentFixture<FlightrouteAircraftSpeedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteAircraftSpeedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteAircraftSpeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
