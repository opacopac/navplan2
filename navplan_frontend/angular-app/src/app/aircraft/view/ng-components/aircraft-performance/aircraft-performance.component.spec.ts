import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPerformanceComponent} from './aircraft-performance.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPerformanceComponent;
    let fixture: ComponentFixture<AircraftPerformanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPerformanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPerformanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
