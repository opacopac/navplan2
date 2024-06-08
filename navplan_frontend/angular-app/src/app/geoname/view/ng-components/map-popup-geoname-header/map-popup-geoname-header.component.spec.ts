import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupGeonameHeaderComponent} from './map-popup-geoname-header.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: MapPopupGeonameHeaderComponent;
    let fixture: ComponentFixture<MapPopupGeonameHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupGeonameHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupGeonameHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
