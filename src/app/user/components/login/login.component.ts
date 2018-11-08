import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '../../user.selectors';
import {Observable} from 'rxjs';
import {LoginUserAction, RegisterUserAction} from '../../user.actions';
import {User} from '../../model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
    }


    onLoginClicked(email: string, password: string, rememberMe: boolean) {
        this.appStore.dispatch(
            new LoginUserAction(email, password, rememberMe)
        );
    }


    onRegisterClicked(email: string, password: string, rememberMe: boolean) {
        this.appStore.dispatch(
            new RegisterUserAction(email, password, rememberMe)
        );

        // TODO: old, remove
        /*this.userService.register(this.email, this.password)
            .subscribe(
                user => {
                    this.clientstorageService.persistUser(user, this.rememberMeChecked);
                    this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
                    this.router.navigate(['./map']);
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                });*/
    }
}
