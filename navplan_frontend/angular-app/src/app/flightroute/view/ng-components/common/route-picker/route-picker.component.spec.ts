import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoutePickerComponent} from './route-picker.component';


xdescribe('FlightrouteListComponent', () => {
    let component: RoutePickerComponent;
    let fixture: ComponentFixture<RoutePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutePickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoutePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
