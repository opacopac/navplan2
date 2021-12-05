import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayWaypointHeaderComponent} from './ol-overlay-waypoint-header.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: OlOverlayWaypointHeaderComponent;
    let fixture: ComponentFixture<OlOverlayWaypointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayWaypointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayWaypointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
