import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupAirportRadioTabComponent} from './map-popup-airport-radio-tab.component';


xdescribe('OlOverlayAirportRadioTabComponent', () => {
    let component: MapPopupAirportRadioTabComponent;
    let fixture: ComponentFixture<MapPopupAirportRadioTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupAirportRadioTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupAirportRadioTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
