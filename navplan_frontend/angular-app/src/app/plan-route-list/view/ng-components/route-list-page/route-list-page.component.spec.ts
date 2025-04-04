import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouteListPageComponent} from './route-list-page.component';


xdescribe('AircraftListContainerComponent', () => {
    let component: RouteListPageComponent;
    let fixture: ComponentFixture<RouteListPageComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [RouteListPageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
