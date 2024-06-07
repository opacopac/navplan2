import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SmallMapButtonComponent} from './small-map-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: SmallMapButtonComponent;
    let fixture: ComponentFixture<SmallMapButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SmallMapButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmallMapButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
