import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '../../user.selectors';
import {LoginUserAction, RegisterUserAction} from '../../user.actions';

@Component({
    selector: 'app-login-register-page',
    templateUrl: './login-register-page.component.html',
    styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
    }


    public onLoginClick([email, password, rememberMe]: [string, string, boolean]) {
        this.appStore.dispatch(
            new LoginUserAction(email, password, rememberMe)
        );
    }


    public onRegisterClick([email, password]: [string, string]) {
        this.appStore.dispatch(
            new RegisterUserAction(email, password)
        );

        // TODO: old, remove
        /*this.userService.register(this.email, this.password)
            .subscribe(
                user => {
                    this.clientstorageService.persistToken(user, this.rememberMeChecked);
                    this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
                    this.router.navigate(['./map']);
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                });*/
    }
}
