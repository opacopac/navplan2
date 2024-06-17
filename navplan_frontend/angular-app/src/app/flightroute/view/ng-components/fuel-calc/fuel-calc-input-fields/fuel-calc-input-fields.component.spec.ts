import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FuelCalcInputFieldsComponent} from './fuel-calc-input-fields.component';


xdescribe('FuelCalcContainerComponent', () => {
    let component: FuelCalcInputFieldsComponent;
    let fixture: ComponentFixture<FuelCalcInputFieldsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelCalcInputFieldsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelCalcInputFieldsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
