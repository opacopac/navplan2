import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteDeleteConfirmDialogComponent} from './flightroute-delete-confirm-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: FlightrouteDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<FlightrouteDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteDeleteConfirmDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
