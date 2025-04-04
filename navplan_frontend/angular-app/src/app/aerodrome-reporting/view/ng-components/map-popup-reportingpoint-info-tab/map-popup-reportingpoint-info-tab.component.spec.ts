import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupReportingpointInfoTabComponent} from './map-popup-reportingpoint-info-tab.component';


xdescribe('OlOverlayReportingpointInfoTabComponent', () => {
    let component: MapPopupReportingpointInfoTabComponent;
    let fixture: ComponentFixture<MapPopupReportingpointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupReportingpointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupReportingpointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
