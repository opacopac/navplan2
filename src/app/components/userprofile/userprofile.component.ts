import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../services/utils/message.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    public oldpassword: string;
    public newpassword: string;


    constructor(
        public sessionService: SessionService,
        public userService: UserService,
        public messageService: MessageService,
        private router: Router) {
        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    onLogoffClicked() {
        this.userService.logout()
            .subscribe(
                () =>{
                    this.messageService.writeSuccessMessage('User successfully logged out!');
                    this.router.navigate(['./map']);
                },
                (error) => {
                    this.messageService.writeErrorMessage(error);
                });
    }


    onChangePwClicked() {
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
