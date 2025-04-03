import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlanTabsComponent} from './plan-tabs.component';


xdescribe('FlightPrepPageComponent', () => {
    let component: PlanTabsComponent;
    let fixture: ComponentFixture<PlanTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanTabsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
