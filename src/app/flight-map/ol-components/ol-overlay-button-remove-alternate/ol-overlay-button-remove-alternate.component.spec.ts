import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayButtonRemoveAlternateComponent} from './ol-overlay-button-remove-alternate.component';


xdescribe('MapOverlayButtonRemoveAlternateComponent', () => {
    let component: OlOverlayButtonRemoveAlternateComponent;
    let fixture: ComponentFixture<OlOverlayButtonRemoveAlternateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayButtonRemoveAlternateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayButtonRemoveAlternateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
