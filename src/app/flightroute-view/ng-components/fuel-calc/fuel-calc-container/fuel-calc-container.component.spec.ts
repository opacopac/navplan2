import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FuelCalcContainerComponent} from './fuel-calc-container.component';


xdescribe('FuelCalcContainerComponent', () => {
    let component: FuelCalcContainerComponent;
    let fixture: ComponentFixture<FuelCalcContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelCalcContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelCalcContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
