import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../../core/services/utils/message.service';


@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit, OnDestroy {
    public email: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private messageService: MessageService) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    onReqPwClicked() {
        this.userService.forgotPassword(this.email)
            .subscribe(
                () => {
                    this.messageService.writeSuccessMessage('A new password has be sent to your email address!');
                    this.router.navigate(['./login']);
                },
                error => {
                    this.messageService.writeErrorMessage(error);
                });
    }
}
