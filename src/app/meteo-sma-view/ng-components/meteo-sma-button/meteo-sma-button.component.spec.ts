import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MeteoSmaButtonComponent} from './meteo-sma-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('VerticalMapButtonComponent', () => {
    let component: MeteoSmaButtonComponent;
    let fixture: ComponentFixture<MeteoSmaButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeteoSmaButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeteoSmaButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
