import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointsContainerComponent} from './waypoints-container.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: WaypointsContainerComponent;
    let fixture: ComponentFixture<WaypointsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
