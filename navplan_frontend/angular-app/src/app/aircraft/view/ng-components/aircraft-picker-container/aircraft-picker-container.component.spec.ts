import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPickerContainerComponent} from './aircraft-picker-container.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPickerContainerComponent;
    let fixture: ComponentFixture<AircraftPickerContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPickerContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPickerContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
