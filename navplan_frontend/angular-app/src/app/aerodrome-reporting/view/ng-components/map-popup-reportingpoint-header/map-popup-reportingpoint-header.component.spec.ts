import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupReportingpointHeaderComponent} from './map-popup-reportingpoint-header.component';


xdescribe('MapOverlayReportingpointComponent', () => {
    let component: MapPopupReportingpointHeaderComponent;
    let fixture: ComponentFixture<MapPopupReportingpointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupReportingpointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupReportingpointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
