import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointButtonRemoveAlternateComponent} from './map-popup-waypoint-button-remove-alternate.component';


xdescribe('MapOverlayButtonRemoveAlternateComponent', () => {
    let component: MapPopupWaypointButtonRemoveAlternateComponent;
    let fixture: ComponentFixture<MapPopupWaypointButtonRemoveAlternateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointButtonRemoveAlternateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointButtonRemoveAlternateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
