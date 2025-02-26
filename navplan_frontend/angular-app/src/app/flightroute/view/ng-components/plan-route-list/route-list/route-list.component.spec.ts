import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouteListComponent} from './route-list.component';


xdescribe('FlightrouteListComponent', () => {
    let component: RouteListComponent;
    let fixture: ComponentFixture<RouteListComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [RouteListComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
