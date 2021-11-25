import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {MessageContainerComponent} from './download-dialog.component';


xdescribe('MessageContainerComponent', () => {
    let component: MessageContainerComponent;
    let fixture: ComponentFixture<MessageContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageContainerComponent],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
