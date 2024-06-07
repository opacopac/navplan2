import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapStatusButtonComponent} from './map-status-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: MapStatusButtonComponent;
    let fixture: ComponentFixture<MapStatusButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapStatusButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapStatusButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
