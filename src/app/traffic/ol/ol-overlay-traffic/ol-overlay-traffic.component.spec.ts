import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayTrafficComponent} from './ol-overlay-traffic.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: OlOverlayTrafficComponent;
    let fixture: ComponentFixture<OlOverlayTrafficComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayTrafficComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayTrafficComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
