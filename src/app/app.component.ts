import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from './services/session/session.service';
import {Sessioncontext} from './model/session/sessioncontext';
import {UserService} from './services/user/user.service';
import {MessageService} from './services/utils/message.service';
import {ClientstorageService} from './services/session/clientstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;


    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private sessionService: SessionService,
        private clientstorageService: ClientstorageService) {

        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        // login "remembered" user
        const persistedUser = this.clientstorageService.getPersistedUser();
        if (persistedUser) {
            this.userService.reLogin(persistedUser.email, persistedUser.token)
                .subscribe(
                    // success
                    (user) => {
                        this.session.user = user;
                        this.clientstorageService.persistUser(user, true);
                        this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
                    },
                    // error
                    (error) =>  {
                        this.session.user = undefined;
                        this.clientstorageService.deletePersistedUser();
                        this.messageService.writeErrorMessage(error);
                    }
                );
        }
    }


    ngOnDestroy() {
    }
}
