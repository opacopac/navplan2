import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWeightAndBalanceTableComponent} from './aircraft-weight-and-balance-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWeightAndBalanceTableComponent;
    let fixture: ComponentFixture<AircraftWeightAndBalanceTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWeightAndBalanceTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWeightAndBalanceTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
