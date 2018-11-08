import {Component, OnInit} from '@angular/core';
import {ClientstorageService} from './shared/services/clientstorage/clientstorage.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from './user/user.selectors';
import {AutoLoginUserAction} from './user/user.actions';
import {User} from './user/model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(
        private appStore: Store<any>,
        private clientstorageService: ClientstorageService) {

        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
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
