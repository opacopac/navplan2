import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayerButtonComponent} from './layer-button.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


xdescribe('LayerButtonComponent', () => {
    let component: LayerButtonComponent;
    let fixture: ComponentFixture<LayerButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayerButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayerButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
