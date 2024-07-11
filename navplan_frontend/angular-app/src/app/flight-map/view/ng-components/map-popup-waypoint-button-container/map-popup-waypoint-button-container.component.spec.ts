import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointButtonContainerComponent} from './map-popup-waypoint-button-container.component';


xdescribe('MapOverlayWaypointContainerComponent', () => {
    let component: MapPopupWaypointButtonContainerComponent;
    let fixture: ComponentFixture<MapPopupWaypointButtonContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointButtonContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointButtonContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
