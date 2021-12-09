import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportRadioTabComponent} from './ol-overlay-airport-radio-tab.component';


xdescribe('OlOverlayAirportRadioTabComponent', () => {
    let component: OlOverlayAirportRadioTabComponent;
    let fixture: ComponentFixture<OlOverlayAirportRadioTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportRadioTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportRadioTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
