import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupAirportChartTabComponent} from './map-popup-airport-chart-tab.component';


xdescribe('OlOverlayAirportChartTabComponent', () => {
    let component: MapPopupAirportChartTabComponent;
    let fixture: ComponentFixture<MapPopupAirportChartTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupAirportChartTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupAirportChartTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
