import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPickerDialogComponent} from './aircraft-picker-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftPickerDialogComponent;
    let fixture: ComponentFixture<AircraftPickerDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftPickerDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPickerDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
