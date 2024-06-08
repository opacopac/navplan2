import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupUserpointHeaderComponent} from './map-popup-userpoint-header.component';


xdescribe('OlOverlayUserpointHeaderComponent', () => {
    let component: MapPopupUserpointHeaderComponent;
    let fixture: ComponentFixture<MapPopupUserpointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupUserpointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupUserpointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
