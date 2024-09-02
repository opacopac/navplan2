import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPickerListComponent} from './aircraft-picker-list.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftPickerListComponent;
    let fixture: ComponentFixture<AircraftPickerListComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftPickerListComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPickerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
