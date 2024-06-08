import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointButtonRemoveFromRouteComponent} from './map-popup-waypoint-button-remove-from-route.component';


xdescribe('MapOverlayButtonRemoveFromRouteComponent', () => {
    let component: MapPopupWaypointButtonRemoveFromRouteComponent;
    let fixture: ComponentFixture<MapPopupWaypointButtonRemoveFromRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointButtonRemoveFromRouteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointButtonRemoveFromRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
