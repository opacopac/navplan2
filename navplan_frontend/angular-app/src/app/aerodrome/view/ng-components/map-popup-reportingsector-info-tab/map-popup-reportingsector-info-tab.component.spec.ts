import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupReportingsectorInfoTabComponent} from './map-popup-reportingsector-info-tab.component';


xdescribe('MapOverlayReportingsectorComponent', () => {
    let component: MapPopupReportingsectorInfoTabComponent;
    let fixture: ComponentFixture<MapPopupReportingsectorInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupReportingsectorInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupReportingsectorInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
