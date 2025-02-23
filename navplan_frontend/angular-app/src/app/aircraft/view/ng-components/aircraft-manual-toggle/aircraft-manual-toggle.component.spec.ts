import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftManualToggle} from './aircraft-manual-toggle.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: AircraftManualToggle;
    let fixture: ComponentFixture<AircraftManualToggle>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftManualToggle]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftManualToggle);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
