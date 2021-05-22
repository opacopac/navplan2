import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayNavaidHeaderComponent} from './ol-overlay-navaid-header.component';


xdescribe('MapOverlayNavaidComponent', () => {
    let component: OlOverlayNavaidHeaderComponent;
    let fixture: ComponentFixture<OlOverlayNavaidHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayNavaidHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayNavaidHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
