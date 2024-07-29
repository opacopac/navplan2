import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPerformanceCorrectionFactorsComponent} from './aircraft-performance-correction-factors.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPerformanceCorrectionFactorsComponent;
    let fixture: ComponentFixture<AircraftPerformanceCorrectionFactorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPerformanceCorrectionFactorsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPerformanceCorrectionFactorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
