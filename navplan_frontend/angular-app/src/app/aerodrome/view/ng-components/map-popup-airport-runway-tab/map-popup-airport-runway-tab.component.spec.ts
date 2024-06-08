import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupAirportRunwayTabComponent} from './map-popup-airport-runway-tab.component';


xdescribe('OlOverlayAirportRunwayTabComponent', () => {
    let component: MapPopupAirportRunwayTabComponent;
    let fixture: ComponentFixture<MapPopupAirportRunwayTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupAirportRunwayTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupAirportRunwayTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
