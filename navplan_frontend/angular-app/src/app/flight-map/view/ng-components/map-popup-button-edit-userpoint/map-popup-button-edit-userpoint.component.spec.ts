import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupButtonEditUserpointComponent} from './map-popup-button-edit-userpoint.component';


xdescribe('MapOverlayButtonEditUserpointComponent', () => {
    let component: MapPopupButtonEditUserpointComponent;
    let fixture: ComponentFixture<MapPopupButtonEditUserpointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupButtonEditUserpointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupButtonEditUserpointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
