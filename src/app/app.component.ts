import {Component, OnInit} from '@angular/core';
import {ClientstorageService} from './services/session/clientstorage.service';
import {AppState} from './app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {getCurrentUser} from './user/user.selectors';
import {AutoLoginUserAction} from './user/user.actions';
import {User} from './model/session/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public currentUser$: Observable<User>;
    public isLoggedIn$: Observable<boolean>;


    constructor(
        private appStore: Store<AppState>,
        private clientstorageService: ClientstorageService) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
    }


    ngOnInit() {
        // auto login "remembered" user
        const persistedUser = this.clientstorageService.getPersistedUser();
        if (persistedUser) {
            this.appStore.dispatch(
                new AutoLoginUserAction(persistedUser.email, persistedUser.token)
            );
        }
    }
}
