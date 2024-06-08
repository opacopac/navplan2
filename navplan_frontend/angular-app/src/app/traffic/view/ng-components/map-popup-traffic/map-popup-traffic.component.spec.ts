import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupTrafficComponent} from './map-popup-traffic.component';


xdescribe('MapOverlayTrafficComponent', () => {
    let component: MapPopupTrafficComponent;
    let fixture: ComponentFixture<MapPopupTrafficComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupTrafficComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupTrafficComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
