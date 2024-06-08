import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayAirspaceComponent} from './map-overlay-airspace.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: MapOverlayAirspaceComponent;
    let fixture: ComponentFixture<MapOverlayAirspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayAirspaceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayAirspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
