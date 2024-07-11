import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointButtonSetAlternateComponent} from './map-popup-waypoint-button-set-alternate.component';


xdescribe('MapOverlayButtonSetAlternateComponent', () => {
    let component: MapPopupWaypointButtonSetAlternateComponent;
    let fixture: ComponentFixture<MapPopupWaypointButtonSetAlternateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointButtonSetAlternateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointButtonSetAlternateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
