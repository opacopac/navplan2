import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayAirspaceStructureComponent} from './map-overlay-airspace-structure.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: MapOverlayAirspaceStructureComponent;
    let fixture: ComponentFixture<MapOverlayAirspaceStructureComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayAirspaceStructureComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayAirspaceStructureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
