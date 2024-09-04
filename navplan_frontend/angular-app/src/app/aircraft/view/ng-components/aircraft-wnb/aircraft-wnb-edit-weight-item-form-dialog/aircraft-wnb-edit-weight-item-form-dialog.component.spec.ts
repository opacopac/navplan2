import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditWeightItemFormDialogComponent} from './aircraft-wnb-edit-weight-item-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditWeightItemFormDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditWeightItemFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditWeightItemFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditWeightItemFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
