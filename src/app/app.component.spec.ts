import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component} from '@angular/core';
import {UserService} from './user/services/user/user.service';
import {MessageService} from './shared/services/message/message.service';


@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

@Component({selector: 'app-editwaypoint', template: ''})
class EditwaypointStubComponent {}

@Component({selector: 'app-message', template: ''})
class MessageStubComponent {}


describe('AppComponent', () => {
    let userServiceStub: Partial<UserService>;
    let messageServiceStub: Partial<MessageService>;


    beforeEach(async(() => {
        userServiceStub = {
            // TODO
        };
        messageServiceStub = {
            // TODO
        };

        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                RouterOutletStubComponent,
                EditwaypointStubComponent,
                MessageStubComponent
            ],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: MessageService, useValue: messageServiceStub },
            ],
            imports: [
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


    it('should render NAVPLAN.CH in a link tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('NAVPLAN.CH');
    }));
});
