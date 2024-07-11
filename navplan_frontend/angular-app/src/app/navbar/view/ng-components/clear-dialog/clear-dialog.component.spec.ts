import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {ClearDialogComponent} from './clear-dialog.component';


xdescribe('ClearDialogComponent', () => {
    let component: ClearDialogComponent;
    let fixture: ComponentFixture<ClearDialogComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ClearDialogComponent],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClearDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
