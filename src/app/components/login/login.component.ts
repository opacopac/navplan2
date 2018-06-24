import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../services/utils/message.service';
import {ClientstorageService} from '../../services/session/clientstorage.service';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../user/selectors/user.selectors';
import {Observable} from 'rxjs/Observable';
import {LoginUserAction, RegisterUserAction} from '../../user/actions/user.actions';
import {User} from '../../model/session/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    public email: string;
    public password: string;
    public rememberMeChecked: boolean;
    public currentUser$: Observable<User>;


    constructor(
        private appStore: Store<AppState>,
        private router: Router,
        private userService: UserService,
        private messageService: MessageService,
        private clientstorageService: ClientstorageService) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    onLoginClicked() {
        this.appStore.dispatch(
            new LoginUserAction(this.email, this.password, this.rememberMeChecked)
        );
    }


    onRegisterClicked() {
        this.appStore.dispatch(
            new RegisterUserAction(this.email, this.password, this.rememberMeChecked)
        );

        // TODO: old, remove
        this.userService.register(this.email, this.password)
            .subscribe(
                user => {
                    this.clientstorageService.persistUser(user, this.rememberMeChecked);
                    this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
                    this.router.navigate(['./map']);
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                });
    }
}
