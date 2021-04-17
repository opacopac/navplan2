import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayButtonNotamComponent} from './map-overlay-button-notam.component';


xdescribe('MapOverlayButtonNotamComponent', () => {
    let component: MapOverlayButtonNotamComponent;
    let fixture: ComponentFixture<MapOverlayButtonNotamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayButtonNotamComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayButtonNotamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
