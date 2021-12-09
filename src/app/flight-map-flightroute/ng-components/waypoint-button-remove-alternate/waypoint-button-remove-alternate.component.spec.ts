import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointButtonRemoveAlternateComponent} from './waypoint-button-remove-alternate.component';


xdescribe('MapOverlayButtonRemoveAlternateComponent', () => {
    let component: WaypointButtonRemoveAlternateComponent;
    let fixture: ComponentFixture<WaypointButtonRemoveAlternateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointButtonRemoveAlternateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointButtonRemoveAlternateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
