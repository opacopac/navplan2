import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../domain/model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser, getRegisterEmailSentTo} from '../../../state/ngrx/user.selectors';
import {RegisterActions} from '../../../state/ngrx/register.actions';
import {LoginActions} from '../../../state/ngrx/login.actions';
import {MatExpansionModule} from '@angular/material/expansion';
import {LoginFormComponent} from '../login-form/login-form.component';
import {RegisterStep1FormComponent} from '../register-step1-form/register-step1-form.component';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-login-register-page',
    standalone: true,
    imports: [
        CommonModule,
        LoginFormComponent,
        RegisterStep1FormComponent,
        MatExpansionModule
    ],
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
        this.appStore.dispatch(LoginActions.userLogin({
            email: email,
            password: password,
            rememberMe: rememberMe
        }));
    }


    public onSendRegisterEmailClick(email: string) {
        this.appStore.dispatch(RegisterActions.sendRegisterEmail({email: email}));
    }
}
