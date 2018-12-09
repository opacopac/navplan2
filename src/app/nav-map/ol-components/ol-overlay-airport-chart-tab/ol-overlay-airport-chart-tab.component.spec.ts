import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportChartTabComponent} from './ol-overlay-airport-chart-tab.component';


xdescribe('OlOverlayAirportChartTabComponent', () => {
    let component: OlOverlayAirportChartTabComponent;
    let fixture: ComponentFixture<OlOverlayAirportChartTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportChartTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportChartTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
