import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportInfoTabComponent} from './ol-overlay-airport-info-tab.component';


xdescribe('OlOverlayAirportInfoTabComponent', () => {
    let component: OlOverlayAirportInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayAirportInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
