import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupNavaidHeaderComponent} from './map-popup-navaid-header.component';


xdescribe('MapOverlayNavaidComponent', () => {
    let component: MapPopupNavaidHeaderComponent;
    let fixture: ComponentFixture<MapPopupNavaidHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupNavaidHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupNavaidHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
