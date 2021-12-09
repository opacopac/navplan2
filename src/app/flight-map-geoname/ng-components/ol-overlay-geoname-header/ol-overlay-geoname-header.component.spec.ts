import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayGeonameHeaderComponent} from './ol-overlay-geoname-header.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: OlOverlayGeonameHeaderComponent;
    let fixture: ComponentFixture<OlOverlayGeonameHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayGeonameHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayGeonameHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
