import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonContainerComponent} from './waypoint-button-container.component';


xdescribe('MapOverlayWaypointContainerComponent', () => {
    let component: WaypointButtonContainerComponent;
    let fixture: ComponentFixture<WaypointButtonContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
