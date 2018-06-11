import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session/session.service';
import { Sessioncontext } from './model/sessioncontext';
import { UserService } from './services/user/user.service';
import { User } from './model/user';
import { MessageService } from './services/utils/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private session: Sessioncontext;


    constructor(
        public userService: UserService,
        public messageService: MessageService,
        public sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        const user: User = this.userService.initUser();
        if (user) {
            this.messageService.writeSuccessMessage('Welcome ' + user.email + '!');
        }
    }
}
