import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupButtonEditWaypointComponent} from './map-popup-button-edit-waypoint.component';


xdescribe('MapOverlayButtonEditWaypointComponent', () => {
    let component: MapPopupButtonEditWaypointComponent;
    let fixture: ComponentFixture<MapPopupButtonEditWaypointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupButtonEditWaypointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupButtonEditWaypointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
