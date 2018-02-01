import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/utils/message.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit {
    public email: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private messageService: MessageService) {
    }


    ngOnInit() {
    }


    onReqPwClicked() {
        this.userService.forgotPassword(
            this.email,
            this.onLoginSuccessCallback.bind(this),
            this.onLoginErrorCallback.bind(this));
    }


    private onLoginSuccessCallback() {
        this.messageService.writeSuccessMessage('A new password has be sent to your email!');
        this.router.navigate(['./login']);
    }


    private onLoginErrorCallback(message: string) {
        this.messageService.writeErrorMessage(message);
    }
}
