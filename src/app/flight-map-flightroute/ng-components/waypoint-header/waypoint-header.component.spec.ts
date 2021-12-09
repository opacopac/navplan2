import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointHeaderComponent} from './waypoint-header.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: WaypointHeaderComponent;
    let fixture: ComponentFixture<WaypointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
