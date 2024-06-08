import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupNavaidInfoTabComponent} from './map-popup-navaid-info-tab.component';


xdescribe('MapOverlayNavaidComponent', () => {
    let component: MapPopupNavaidInfoTabComponent;
    let fixture: ComponentFixture<MapPopupNavaidInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupNavaidInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupNavaidInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
