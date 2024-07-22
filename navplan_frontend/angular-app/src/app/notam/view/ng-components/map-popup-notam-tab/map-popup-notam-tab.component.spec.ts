import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupNotamTabComponent} from './map-popup-notam-tab.component';


xdescribe('MapOverlayNotamTabComponent', () => {
    let component: MapPopupNotamTabComponent;
    let fixture: ComponentFixture<MapPopupNotamTabComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [MapPopupNotamTabComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupNotamTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
