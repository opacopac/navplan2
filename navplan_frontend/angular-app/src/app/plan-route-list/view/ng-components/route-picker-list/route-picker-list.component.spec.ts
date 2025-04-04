import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoutePickerListComponent} from './route-picker-list.component';


xdescribe('FlightrouteListComponent', () => {
    let component: RoutePickerListComponent;
    let fixture: ComponentFixture<RoutePickerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutePickerListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoutePickerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
