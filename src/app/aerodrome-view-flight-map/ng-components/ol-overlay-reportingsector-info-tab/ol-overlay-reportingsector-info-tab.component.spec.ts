import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayReportingsectorInfoTabComponent} from './ol-overlay-reportingsector-info-tab.component';


xdescribe('MapOverlayReportingsectorComponent', () => {
    let component: OlOverlayReportingsectorInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayReportingsectorInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayReportingsectorInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayReportingsectorInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
