import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapLayerSelectionButtonComponent} from './map-layer-selection-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: MapLayerSelectionButtonComponent;
    let fixture: ComponentFixture<MapLayerSelectionButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapLayerSelectionButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapLayerSelectionButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
