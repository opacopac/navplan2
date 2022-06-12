import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonAddToRouteComponent} from './waypoint-button-add-to-route.component';


xdescribe('MapOverlayButtonAddToRouteComponent', () => {
    let component: WaypointButtonAddToRouteComponent;
    let fixture: ComponentFixture<WaypointButtonAddToRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonAddToRouteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonAddToRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
