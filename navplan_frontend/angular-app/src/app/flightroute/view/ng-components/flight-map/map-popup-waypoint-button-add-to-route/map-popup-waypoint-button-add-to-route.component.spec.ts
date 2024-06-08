import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointButtonAddToRouteComponent} from './map-popup-waypoint-button-add-to-route.component';


xdescribe('MapOverlayButtonAddToRouteComponent', () => {
    let component: MapPopupWaypointButtonAddToRouteComponent;
    let fixture: ComponentFixture<MapPopupWaypointButtonAddToRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointButtonAddToRouteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointButtonAddToRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
