import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayMetarTafComponent} from './ol-overlay-metar-taf.component';


xdescribe('OlOverlayMetarTafComponent', () => {
    let component: OlOverlayMetarTafComponent;
    let fixture: ComponentFixture<OlOverlayMetarTafComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayMetarTafComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayMetarTafComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
