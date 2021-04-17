import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayUserpointComponent} from './ol-overlay-userpoint.component';


xdescribe('MapOverlayUserpointComponent', () => {
    let component: OlOverlayUserpointComponent;
    let fixture: ComponentFixture<OlOverlayUserpointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayUserpointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayUserpointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
