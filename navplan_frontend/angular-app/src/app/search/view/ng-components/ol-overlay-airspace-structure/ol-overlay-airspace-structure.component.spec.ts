import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayAirspaceStructureComponent} from './ol-overlay-airspace-structure.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: OlOverlayAirspaceStructureComponent;
    let fixture: ComponentFixture<OlOverlayAirspaceStructureComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayAirspaceStructureComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayAirspaceStructureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
