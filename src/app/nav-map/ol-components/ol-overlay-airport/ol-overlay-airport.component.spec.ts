import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportComponent} from './ol-overlay-airport.component';


xdescribe('MapOverlayAirportComponent', () => {
    let component: OlOverlayAirportComponent;
    let fixture: ComponentFixture<OlOverlayAirportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
