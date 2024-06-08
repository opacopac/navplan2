import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupUserpointInfoTabComponent} from './map-popup-userpoint-info-tab.component';


xdescribe('OlOverlayUserpointHeaderComponent', () => {
    let component: MapPopupUserpointInfoTabComponent;
    let fixture: ComponentFixture<MapPopupUserpointInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupUserpointInfoTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupUserpointInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
