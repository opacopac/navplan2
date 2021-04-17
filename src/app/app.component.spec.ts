import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';


@Component({selector: 'router-outlet', template: ''})
class MockRouterOutletComponent { }

@Component({selector: 'app-navbar-container', template: ''})
class MockNavbarContainerComponent {}

@Component({selector: 'app-message-container', template: ''})
class MockMessageContainerComponent {}


describe('AppComponent', () => {
/*    let userServiceStub: Partial<RestUserService>;
    let messageServiceStub: Partial<MessageService>;*/


    beforeEach(async(() => {
        /*userServiceStub = {
            // TODO
        };
        messageServiceStub = {
            // TODO
        };*/

        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MockRouterOutletComponent,
                MockNavbarContainerComponent,
                MockMessageContainerComponent
            ],
            providers: [
                /*{ provide: RestUserService, useValue: userServiceStub },
                { provide: MessageService, useValue: messageServiceStub },*/
            ],
            imports: [
                StoreModule.forRoot({}),
            ]
        }).compileComponents();
    }));


    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));


    /*it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));*/


    /*it('should render NAVPLAN.CH in a link tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('NAVPLAN.CH');
    }));*/
});
