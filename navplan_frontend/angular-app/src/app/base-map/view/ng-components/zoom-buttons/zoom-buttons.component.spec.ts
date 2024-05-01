import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ZoomButtonsComponent} from './zoom-buttons.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


xdescribe('ZoomButtonsComponent', () => {
    let component: ZoomButtonsComponent;
    let fixture: ComponentFixture<ZoomButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ZoomButtonsComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ZoomButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
