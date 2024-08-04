import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditItemDialogComponent} from './aircraft-wnb-edit-item-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: AircraftWnbEditItemDialogComponent;
    let fixture: ComponentFixture<AircraftWnbEditItemDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditItemDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditItemDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
