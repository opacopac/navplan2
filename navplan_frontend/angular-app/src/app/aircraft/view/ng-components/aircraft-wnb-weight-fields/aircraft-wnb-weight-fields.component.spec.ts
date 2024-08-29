import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbWeightFieldsComponent} from './aircraft-wnb-weight-fields.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWnbWeightFieldsComponent;
    let fixture: ComponentFixture<AircraftWnbWeightFieldsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbWeightFieldsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbWeightFieldsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
