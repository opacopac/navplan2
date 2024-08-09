import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToggleManualAircraft} from './toggle-manual-aircraft.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: ToggleManualAircraft;
    let fixture: ComponentFixture<ToggleManualAircraft>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleManualAircraft]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleManualAircraft);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
