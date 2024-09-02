import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPerformanceTableComponent} from './aircraft-performance-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPerformanceTableComponent;
    let fixture: ComponentFixture<AircraftPerformanceTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPerformanceTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPerformanceTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
