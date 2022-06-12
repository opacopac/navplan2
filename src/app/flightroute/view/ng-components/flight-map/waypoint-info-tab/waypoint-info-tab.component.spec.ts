import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointInfoTabComponent} from './waypoint-info-tab.component';


xdescribe('OlOverlayAirportInfoTabComponent', () => {
    let component: WaypointInfoTabComponent;
    let fixture: ComponentFixture<WaypointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
