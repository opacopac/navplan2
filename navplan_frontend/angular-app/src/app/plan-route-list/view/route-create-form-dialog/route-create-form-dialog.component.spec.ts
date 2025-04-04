import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouteCreateFormDialogComponent} from './route-create-form-dialog.component';


xdescribe('EditWaypointDialogComponent', () => {
    let component: RouteCreateFormDialogComponent;
    let fixture: ComponentFixture<RouteCreateFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RouteCreateFormDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteCreateFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
