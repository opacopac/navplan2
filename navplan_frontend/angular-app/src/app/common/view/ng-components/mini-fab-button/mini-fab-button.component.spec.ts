import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MiniFabButtonComponent} from './mini-fab-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: MiniFabButtonComponent;
    let fixture: ComponentFixture<MiniFabButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MiniFabButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MiniFabButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
