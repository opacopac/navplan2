import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RoutePickerContainerComponent} from './route-picker-container.component';


xdescribe('FlightrouteListComponent', () => {
    let component: RoutePickerContainerComponent;
    let fixture: ComponentFixture<RoutePickerContainerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoutePickerContainerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RoutePickerContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
