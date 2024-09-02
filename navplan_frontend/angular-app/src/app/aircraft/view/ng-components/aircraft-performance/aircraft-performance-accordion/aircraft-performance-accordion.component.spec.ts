import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPerformanceAccordionComponent} from './aircraft-performance-accordion.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPerformanceAccordionComponent;
    let fixture: ComponentFixture<AircraftPerformanceAccordionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPerformanceAccordionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPerformanceAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
