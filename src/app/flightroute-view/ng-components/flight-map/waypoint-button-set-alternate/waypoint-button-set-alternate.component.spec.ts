import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonSetAlternateComponent} from './waypoint-button-set-alternate.component';


xdescribe('MapOverlayButtonSetAlternateComponent', () => {
    let component: WaypointButtonSetAlternateComponent;
    let fixture: ComponentFixture<WaypointButtonSetAlternateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonSetAlternateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonSetAlternateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
