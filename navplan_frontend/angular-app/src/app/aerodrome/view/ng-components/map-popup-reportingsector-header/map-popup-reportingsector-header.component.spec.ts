import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupReportingsectorHeaderComponent} from './map-popup-reportingsector-header.component';


xdescribe('MapOverlayReportingsectorComponent', () => {
    let component: MapPopupReportingsectorHeaderComponent;
    let fixture: ComponentFixture<MapPopupReportingsectorHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupReportingsectorHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupReportingsectorHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
