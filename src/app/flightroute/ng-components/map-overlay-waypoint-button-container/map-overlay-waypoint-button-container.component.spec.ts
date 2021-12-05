import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayWaypointButtonContainerComponent} from './map-overlay-waypoint-button-container.component';


xdescribe('MapOverlayWaypointContainerComponent', () => {
    let component: MapOverlayWaypointButtonContainerComponent;
    let fixture: ComponentFixture<MapOverlayWaypointButtonContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayWaypointButtonContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayWaypointButtonContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
