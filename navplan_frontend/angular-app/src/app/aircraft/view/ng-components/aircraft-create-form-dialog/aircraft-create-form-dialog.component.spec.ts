import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftCreateFormDialogComponent} from './aircraft-create-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftCreateFormDialogComponent;
    let fixture: ComponentFixture<AircraftCreateFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftCreateFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftCreateFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
