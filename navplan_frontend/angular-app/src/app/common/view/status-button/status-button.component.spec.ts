import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StatusButtonComponent} from './status-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: StatusButtonComponent;
    let fixture: ComponentFixture<StatusButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
