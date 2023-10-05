import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrafficButtonComponent} from './traffic-button.component';


xdescribe('TrafficButtonComponent', () => {
    let component: TrafficButtonComponent;
    let fixture: ComponentFixture<TrafficButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrafficButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrafficButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
