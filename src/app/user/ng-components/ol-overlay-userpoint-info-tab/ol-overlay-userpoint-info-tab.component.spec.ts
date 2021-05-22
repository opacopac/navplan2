import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayUserpointInfoTabComponent} from './ol-overlay-userpoint-info-tab.component';


xdescribe('OlOverlayUserpointHeaderComponent', () => {
    let component: OlOverlayUserpointInfoTabComponent;
    let fixture: ComponentFixture<OlOverlayUserpointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayUserpointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayUserpointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
