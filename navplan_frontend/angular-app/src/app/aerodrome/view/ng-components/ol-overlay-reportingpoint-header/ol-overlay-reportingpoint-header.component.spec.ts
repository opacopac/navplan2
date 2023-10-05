import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayReportingpointHeaderComponent} from './ol-overlay-reportingpoint-header.component';


xdescribe('MapOverlayReportingpointComponent', () => {
    let component: OlOverlayReportingpointHeaderComponent;
    let fixture: ComponentFixture<OlOverlayReportingpointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayReportingpointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayReportingpointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
