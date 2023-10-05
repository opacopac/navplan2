import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonRemoveFromRouteComponent} from './waypoint-button-remove-from-route.component';


xdescribe('MapOverlayButtonRemoveFromRouteComponent', () => {
    let component: WaypointButtonRemoveFromRouteComponent;
    let fixture: ComponentFixture<WaypointButtonRemoveFromRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonRemoveFromRouteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonRemoveFromRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
