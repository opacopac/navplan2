import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayVariationComponent} from './map-overlay-variation.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: MapOverlayVariationComponent;
    let fixture: ComponentFixture<MapOverlayVariationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayVariationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayVariationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
