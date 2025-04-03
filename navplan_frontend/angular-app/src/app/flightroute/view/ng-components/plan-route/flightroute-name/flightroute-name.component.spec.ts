import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteNameComponent} from './flightroute-name.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FlightrouteNameComponent;
    let fixture: ComponentFixture<FlightrouteNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteNameComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
