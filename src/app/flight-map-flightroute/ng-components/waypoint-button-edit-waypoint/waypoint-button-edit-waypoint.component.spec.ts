import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonEditWaypointComponent} from './waypoint-button-edit-waypoint.component';


xdescribe('MapOverlayButtonEditWaypointComponent', () => {
    let component: WaypointButtonEditWaypointComponent;
    let fixture: ComponentFixture<WaypointButtonEditWaypointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonEditWaypointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonEditWaypointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
