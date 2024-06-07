import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AttributionsButtonComponent} from './attributions-button-component.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: AttributionsButtonComponent;
    let fixture: ComponentFixture<AttributionsButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AttributionsButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttributionsButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
