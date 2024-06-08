import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayPositionComponent} from './map-overlay-position.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: MapOverlayPositionComponent;
    let fixture: ComponentFixture<MapOverlayPositionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayPositionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayPositionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
