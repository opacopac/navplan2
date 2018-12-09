import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayButtonAddToRouteComponent} from './ol-overlay-button-add-to-route.component';


xdescribe('MapOverlayButtonAddToRouteComponent', () => {
    let component: OlOverlayButtonAddToRouteComponent;
    let fixture: ComponentFixture<OlOverlayButtonAddToRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayButtonAddToRouteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayButtonAddToRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
