import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupAirportInfoTabComponent} from './map-popup-airport-info-tab.component';


xdescribe('OlOverlayAirportInfoTabComponent', () => {
    let component: MapPopupAirportInfoTabComponent;
    let fixture: ComponentFixture<MapPopupAirportInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupAirportInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupAirportInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
