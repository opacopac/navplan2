import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../services/utils/message.service';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../user/user.selectors';
import {Observable} from 'rxjs/Observable';
import {ChangePwAction, LogoutUserAction} from '../../user/user.actions';
import {User} from '../../model/session/user';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    public oldpassword: string;
    public newpassword: string;
    public currentUser$: Observable<User>;


    constructor(
        private appStore: Store<AppState>,
        public sessionService: SessionService,
        public userService: UserService,
        public messageService: MessageService) {

        this.currentUser$ = this.appStore.select(getCurrentUser);

        // TODO: remove
        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    onLogoffClicked(currentUser: User) {
        this.appStore.dispatch(
            new LogoutUserAction(currentUser.email, currentUser.token)
        );
    }


    onChangePwClicked(currentUser: User) {
        this.appStore.dispatch(
            new ChangePwAction(currentUser.email, this.oldpassword, this.newpassword)
        );

        // TODO: remove
        this.userService.updatePassword(this.session.user.email, this.oldpassword, this.newpassword)
            .subscribe(
                () => {
                    this.messageService.writeSuccessMessage('Password successfully updated!');
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                }
            );
    }
}
