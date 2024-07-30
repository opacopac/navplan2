import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlanPageComponent} from './plan-page.component';


xdescribe('FlightPrepPageComponent', () => {
    let component: PlanPageComponent;
    let fixture: ComponentFixture<PlanPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
