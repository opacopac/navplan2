import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayButtonEditUserpointComponent} from './ol-overlay-button-edit-userpoint.component';


xdescribe('MapOverlayButtonEditUserpointComponent', () => {
    let component: OlOverlayButtonEditUserpointComponent;
    let fixture: ComponentFixture<OlOverlayButtonEditUserpointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayButtonEditUserpointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayButtonEditUserpointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
