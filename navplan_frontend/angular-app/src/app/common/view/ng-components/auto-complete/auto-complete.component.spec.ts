import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AutoCompleteComponent} from './auto-complete.component';


xdescribe('SearchBoxComponent', () => {
    let component: AutoCompleteComponent;
    let fixture: ComponentFixture<AutoCompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutoCompleteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoCompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
