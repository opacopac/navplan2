import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupWaypointHeaderComponent} from './map-popup-waypoint-header.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: MapPopupWaypointHeaderComponent;
    let fixture: ComponentFixture<MapPopupWaypointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupWaypointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupWaypointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
