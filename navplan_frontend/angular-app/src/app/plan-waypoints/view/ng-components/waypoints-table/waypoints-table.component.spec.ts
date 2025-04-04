import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WaypointsTableComponent} from './waypoints-table.component';


xdescribe('WaypointListComponent', () => {
    let component: WaypointsTableComponent;
    let fixture: ComponentFixture<WaypointsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaypointsTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaypointsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
