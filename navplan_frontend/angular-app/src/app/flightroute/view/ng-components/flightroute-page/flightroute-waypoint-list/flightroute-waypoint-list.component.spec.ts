import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteWaypointListComponent} from './flightroute-waypoint-list.component';


xdescribe('WaypointListComponent', () => {
    let component: FlightrouteWaypointListComponent;
    let fixture: ComponentFixture<FlightrouteWaypointListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteWaypointListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteWaypointListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
