import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrashIconButtonComponent} from './trash-icon-button.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: TrashIconButtonComponent;
    let fixture: ComponentFixture<TrashIconButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrashIconButtonComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrashIconButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
