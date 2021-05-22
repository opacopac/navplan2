import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirportHeaderComponent} from './ol-overlay-airport-header.component';


xdescribe('MapOverlayAirportComponent', () => {
    let component: OlOverlayAirportHeaderComponent;
    let fixture: ComponentFixture<OlOverlayAirportHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirportHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirportHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
