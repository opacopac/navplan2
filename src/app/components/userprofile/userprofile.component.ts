import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/utils/message.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
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


    onLogoffClicked() {
        this.userService.logout();
        this.messageService.writeSuccessMessage('User successfully logged out!');
        this.router.navigate(['./map']);
    }


    onChangePwClicked() {
        this.userService.updatePassword(
            this.session.user.email,
            this.oldpassword,
            this.newpassword,
            this.onChangePwSuccessCallback.bind(this),
            this.onChangePwErrorCallback.bind(this));
    }


    private onChangePwSuccessCallback() {
        this.messageService.writeSuccessMessage('Password successfully updated!');
        //this.router.navigate(['./map']);
    }


    private onChangePwErrorCallback(message: string) {
        this.messageService.writeErrorMessage(message);
    }
}
