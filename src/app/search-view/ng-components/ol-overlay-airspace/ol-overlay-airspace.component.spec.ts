import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirspaceComponent} from './ol-overlay-airspace.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: OlOverlayAirspaceComponent;
    let fixture: ComponentFixture<OlOverlayAirspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirspaceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
