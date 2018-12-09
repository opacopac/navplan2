import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapOverlayNotamItemComponent} from './map-overlay-notam-item.component';


xdescribe('MapOverlayNotamItemComponent', () => {
    let component: MapOverlayNotamItemComponent;
    let fixture: ComponentFixture<MapOverlayNotamItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapOverlayNotamItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapOverlayNotamItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
