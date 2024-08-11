import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPickerDialog} from './aircraft-picker-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftPickerDialog;
    let fixture: ComponentFixture<AircraftPickerDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPickerDialog]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPickerDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
