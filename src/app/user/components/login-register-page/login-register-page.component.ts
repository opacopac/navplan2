import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser, getVerifyEmailSentTo} from '../../user.selectors';
import {LoginUserAction, VerifyEmailAction} from '../../user.actions';

@Component({
    selector: 'app-login-register-page',
    templateUrl: './login-register-page.component.html',
    styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {
    public currentUser$: Observable<User>;
    public verifyEmailSentTo$: Observable<string>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
        this.verifyEmailSentTo$ = this.appStore.pipe(select(getVerifyEmailSentTo));
    }


    ngOnInit() {
    }


    public onLoginClick([email, password, rememberMe]: [string, string, boolean]) {
        this.appStore.dispatch(
            new LoginUserAction(email, password, rememberMe)
        );
    }


    public onVerifyEmailClick(email: string) {
        this.appStore.dispatch(new VerifyEmailAction(email));
    }
}
