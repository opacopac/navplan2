import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayNotamTabComponent} from './map-overlay-notam-tab.component';


xdescribe('MapOverlayNotamTabComponent', () => {
    let component: MapOverlayNotamTabComponent;
    let fixture: ComponentFixture<MapOverlayNotamTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayNotamTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayNotamTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
