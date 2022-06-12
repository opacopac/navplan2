import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlMapOverlayComponent} from './ol-map-overlay.component';


xdescribe('OlMapOverlayComponent', () => {
    let component: OlMapOverlayComponent;
    let fixture: ComponentFixture<OlMapOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlMapOverlayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlMapOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
