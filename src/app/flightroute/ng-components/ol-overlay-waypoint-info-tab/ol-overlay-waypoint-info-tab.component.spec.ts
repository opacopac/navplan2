import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayWaypointInfoTabComponent} from './ol-overlay-waypoint-info-tab.component';


xdescribe('OlOverlayAirportInfoTabComponent', () => {
    let component: OlOverlayWaypointInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayWaypointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayWaypointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayWaypointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
