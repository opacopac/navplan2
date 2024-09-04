import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbWeightItemTableComponent} from './aircraft-wnb-weight-item-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWnbWeightItemTableComponent;
    let fixture: ComponentFixture<AircraftWnbWeightItemTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbWeightItemTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbWeightItemTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
