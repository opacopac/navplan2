import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointComponent} from './map-popup-waypoint.component';


xdescribe('MapOverlayWaypointComponent', () => {
    let component: MapPopupWaypointComponent;
    let fixture: ComponentFixture<MapPopupWaypointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
