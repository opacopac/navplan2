import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoutePickerListDialogComponent} from './route-picker-list-dialog.component';


xdescribe('FlightrouteListDialogComponent', () => {
    let component: RoutePickerListDialogComponent;
    let fixture: ComponentFixture<RoutePickerListDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutePickerListDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoutePickerListDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
