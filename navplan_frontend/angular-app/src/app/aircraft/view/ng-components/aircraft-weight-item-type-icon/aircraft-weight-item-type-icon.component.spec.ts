import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWeightItemTypeIconComponent} from './aircraft-weight-item-type-icon.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWeightItemTypeIconComponent;
    let fixture: ComponentFixture<AircraftWeightItemTypeIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWeightItemTypeIconComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWeightItemTypeIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
