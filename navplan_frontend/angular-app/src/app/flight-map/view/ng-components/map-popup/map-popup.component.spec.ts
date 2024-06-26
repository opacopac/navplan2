import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapPopupComponent} from './map-popup.component';


xdescribe('OlMapOverlayComponent', () => {
    let component: MapPopupComponent;
    let fixture: ComponentFixture<MapPopupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPopupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
