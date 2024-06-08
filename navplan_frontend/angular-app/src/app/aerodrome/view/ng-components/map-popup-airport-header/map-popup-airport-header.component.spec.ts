import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupAirportHeaderComponent} from './map-popup-airport-header.component';


xdescribe('MapOverlayAirportComponent', () => {
    let component: MapPopupAirportHeaderComponent;
    let fixture: ComponentFixture<MapPopupAirportHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupAirportHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupAirportHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
