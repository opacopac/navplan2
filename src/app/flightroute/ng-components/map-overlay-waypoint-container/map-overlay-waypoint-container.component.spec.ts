import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayWaypointContainerComponent} from './map-overlay-waypoint-container.component';


xdescribe('MapOverlayWaypointContainerComponent', () => {
    let component: MapOverlayWaypointContainerComponent;
    let fixture: ComponentFixture<MapOverlayWaypointContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayWaypointContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayWaypointContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
