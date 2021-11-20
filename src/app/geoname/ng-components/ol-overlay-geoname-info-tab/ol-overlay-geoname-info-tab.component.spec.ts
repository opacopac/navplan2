import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayGeonameInfoTabComponent} from './ol-overlay-geoname-info-tab.component';


xdescribe('OlOverlayGeonameInfoTabComponent', () => {
    let component: OlOverlayGeonameInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayGeonameInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayGeonameInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayGeonameInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
