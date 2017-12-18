import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public rememberMeChecked: boolean;


    constructor(private router: Router,
                private userService: UserService,
                private messageService: MessageService) {
    }


    ngOnInit() {
    }


    onLoginClicked() {
        this.userService.login(
            this.email,
            this.password,
            this.rememberMeChecked,
            this.onLoginSuccessCallback.bind(this),
            this.onLoginErrorCallback.bind(this));
    }


    private onLoginSuccessCallback(user: User) {
        this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
        this.router.navigate(['./map']);
    }


    private onLoginErrorCallback(message: string) {
        this.messageService.writeErrorMessage(message);
    }


    onRegisterClicked() {
        this.userService.register(
            this.email,
            this.password,
            this.rememberMeChecked,
            this.onRegisterSuccessCallback.bind(this),
            this.onRegisterErrorCallback.bind(this));
    }


    private onRegisterSuccessCallback(user: User) {
        this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
        this.router.navigate(['./map']);
    }


    private onRegisterErrorCallback(message: string) {
        this.messageService.writeErrorMessage(message);
    }
}
