import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupGeonameInfoTabComponent} from './map-popup-geoname-info-tab.component';


xdescribe('OlOverlayGeonameInfoTabComponent', () => {
    let component: MapPopupGeonameInfoTabComponent;
    let fixture: ComponentFixture<MapPopupGeonameInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupGeonameInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupGeonameInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
