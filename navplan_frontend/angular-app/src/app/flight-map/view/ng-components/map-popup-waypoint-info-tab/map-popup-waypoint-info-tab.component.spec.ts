import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointInfoTabComponent} from './map-popup-waypoint-info-tab.component';


xdescribe('OlOverlayAirportInfoTabComponent', () => {
    let component: MapPopupWaypointInfoTabComponent;
    let fixture: ComponentFixture<MapPopupWaypointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
