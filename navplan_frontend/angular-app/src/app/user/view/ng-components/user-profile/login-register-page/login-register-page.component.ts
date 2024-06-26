import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../domain/model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser, getRegisterEmailSentTo} from '../../../../state/ngrx/user.selectors';
import {LoginUserAction, SendRegisterEmailAction} from '../../../../state/ngrx/user.actions';

@Component({
    selector: 'app-login-register-page',
    templateUrl: './login-register-page.component.html',
    styleUrls: ['./login-register-page.component.scss']
})
export class LoginRegisterPageComponent implements OnInit {
    public currentUser$: Observable<User>;
    public registerEmailSentTo$: Observable<string>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
        this.registerEmailSentTo$ = this.appStore.pipe(select(getRegisterEmailSentTo));
    }


    ngOnInit() {
    }


    public onLoginClick([email, password, rememberMe]: [string, string, boolean]) {
        this.appStore.dispatch(
            new LoginUserAction(email, password, rememberMe)
        );
    }


    public onSendRegisterEmailClick(email: string) {
        this.appStore.dispatch(new SendRegisterEmailAction(email));
    }
}
