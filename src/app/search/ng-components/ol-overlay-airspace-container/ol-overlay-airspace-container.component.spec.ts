import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirspaceContainerComponent} from './ol-overlay-airspace-container.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: OlOverlayAirspaceContainerComponent;
    let fixture: ComponentFixture<OlOverlayAirspaceContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirspaceContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirspaceContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
