import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavplanDialogComponent} from './navplan-dialog.component';
import {MatButtonModule} from '@angular/material/button';


xdescribe('LayerButtonComponent', () => {
    let component: NavplanDialogComponent;
    let fixture: ComponentFixture<NavplanDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavplanDialogComponent],
            imports: [
                MatButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavplanDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
