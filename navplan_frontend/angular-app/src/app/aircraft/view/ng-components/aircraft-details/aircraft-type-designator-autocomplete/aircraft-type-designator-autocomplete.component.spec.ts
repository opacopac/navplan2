import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftListContainerComponent} from './aircraft-type-designator-autocomplete.component';


xdescribe('AircraftListContainerComponent', () => {
    let component: AircraftListContainerComponent;
    let fixture: ComponentFixture<AircraftListContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftListContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftListContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
