import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlanWnbContainerComponent} from './plan-wnb-container.component';


xdescribe('FuelCalcContainerComponent', () => {
    let component: PlanWnbContainerComponent;
    let fixture: ComponentFixture<PlanWnbContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanWnbContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanWnbContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
