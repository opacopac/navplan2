import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightPrepPageComponent} from './flight-prep-page.component';


xdescribe('FlightPrepPageComponent', () => {
    let component: FlightPrepPageComponent;
    let fixture: ComponentFixture<FlightPrepPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightPrepPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightPrepPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
