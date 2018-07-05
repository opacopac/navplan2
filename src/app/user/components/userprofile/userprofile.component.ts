import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../../core/services/utils/message.service';
import {AppState} from '../../../app.state';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../user.selectors';
import {Observable} from 'rxjs/Observable';
import {ChangePwAction, LogoutUserAction} from '../../user.actions';
import {User} from '../../model/user';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnDestroy {
    public currentUser$: Observable<User>;


    constructor(
        private appStore: Store<AppState>,
        public messageService: MessageService) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
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


    onChangePwClicked(currentUser: User, oldPassword: string, newPassword: string) {
        this.appStore.dispatch(
            new ChangePwAction(currentUser.email, oldPassword, newPassword)
        );

        // TODO: remove
        /*this.userService.updatePassword(this.session.user.email, this.oldpassword, this.newpassword)
            .subscribe(
                () => {
                    this.messageService.writeSuccessMessage('Password successfully updated!');
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                }
            );*/
    }
}
