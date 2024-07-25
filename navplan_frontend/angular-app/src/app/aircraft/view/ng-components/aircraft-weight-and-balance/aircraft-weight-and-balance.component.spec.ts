import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWeightAndBalanceComponent} from './aircraft-weight-and-balance.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWeightAndBalanceComponent;
    let fixture: ComponentFixture<AircraftWeightAndBalanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWeightAndBalanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWeightAndBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
