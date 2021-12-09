import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayReportingsectorHeaderComponent} from './ol-overlay-reportingsector-header.component';


xdescribe('MapOverlayReportingsectorComponent', () => {
    let component: OlOverlayReportingsectorHeaderComponent;
    let fixture: ComponentFixture<OlOverlayReportingsectorHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayReportingsectorHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayReportingsectorHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
