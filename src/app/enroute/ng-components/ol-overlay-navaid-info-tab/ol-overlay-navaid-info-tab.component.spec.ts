import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayNavaidInfoTabComponent} from './ol-overlay-navaid-info-tab.component';


xdescribe('MapOverlayNavaidComponent', () => {
    let component: OlOverlayNavaidInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayNavaidInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayNavaidInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayNavaidInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
