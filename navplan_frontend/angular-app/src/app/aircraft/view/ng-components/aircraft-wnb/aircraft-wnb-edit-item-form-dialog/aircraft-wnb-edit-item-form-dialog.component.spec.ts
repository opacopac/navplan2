import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditItemFormDialogComponent} from './aircraft-wnb-edit-item-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditItemFormDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditItemFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditItemFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditItemFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
