import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouteListTableComponent} from './route-list-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: RouteListTableComponent;
    let fixture: ComponentFixture<RouteListTableComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [RouteListTableComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteListTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
