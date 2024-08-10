import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWeightItemTypeIcon} from './aircraft-weight-item-type-icon.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWeightItemTypeIcon;
    let fixture: ComponentFixture<AircraftWeightItemTypeIcon>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWeightItemTypeIcon]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWeightItemTypeIcon);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
