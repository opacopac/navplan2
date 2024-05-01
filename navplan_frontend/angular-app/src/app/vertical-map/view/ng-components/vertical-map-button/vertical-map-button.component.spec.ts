import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VerticalMapButtonComponent} from './vertical-map-button.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


xdescribe('VerticalMapButtonComponent', () => {
    let component: VerticalMapButtonComponent;
    let fixture: ComponentFixture<VerticalMapButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerticalMapButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerticalMapButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
