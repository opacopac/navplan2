import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FuelSaveComponent} from './fuel-save.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FuelSaveComponent;
    let fixture: ComponentFixture<FuelSaveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelSaveComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
