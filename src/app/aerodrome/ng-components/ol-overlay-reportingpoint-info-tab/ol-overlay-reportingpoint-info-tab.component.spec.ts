import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayReportingpointInfoTabComponent} from './ol-overlay-reportingpoint-info-tab.component';


xdescribe('OlOverlayReportingpointInfoTabComponent', () => {
    let component: OlOverlayReportingpointInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayReportingpointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayReportingpointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayReportingpointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
