import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouteDeleteConfirmDialogComponent} from './route-delete-confirm-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: RouteDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<RouteDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RouteDeleteConfirmDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
