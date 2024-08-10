import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlanWnbTableComponent} from './plan-wnb-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: PlanWnbTableComponent;
    let fixture: ComponentFixture<PlanWnbTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanWnbTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanWnbTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
