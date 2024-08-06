import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPickerComponent} from './aircraft-picker.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPickerComponent;
    let fixture: ComponentFixture<AircraftPickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
