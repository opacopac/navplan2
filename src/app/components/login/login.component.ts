import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../services/utils/message.service';
import {ClientstorageService} from '../../services/session/clientstorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    public email: string;
    public password: string;
    public rememberMeChecked: boolean;


    constructor(private router: Router,
                private userService: UserService,
                private messageService: MessageService,
                private clientstorageService: ClientstorageService) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    onLoginClicked() {
        this.userService.login(this.email, this.password)
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


    onRegisterClicked() {
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
