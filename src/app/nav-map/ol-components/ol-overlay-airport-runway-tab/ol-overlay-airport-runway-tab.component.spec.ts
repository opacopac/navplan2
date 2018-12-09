import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportRunwayTabComponent} from './ol-overlay-airport-runway-tab.component';


xdescribe('OlOverlayAirportRunwayTabComponent', () => {
    let component: OlOverlayAirportRunwayTabComponent;
    let fixture: ComponentFixture<OlOverlayAirportRunwayTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportRunwayTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportRunwayTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
