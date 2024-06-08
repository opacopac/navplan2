import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayElevationComponent} from './map-overlay-elevation.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: MapOverlayElevationComponent;
    let fixture: ComponentFixture<MapOverlayElevationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayElevationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayElevationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
