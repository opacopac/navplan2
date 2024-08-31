import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormDialogComponent} from './form-dialog.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: FormDialogComponent;
    let fixture: ComponentFixture<FormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDialogComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
