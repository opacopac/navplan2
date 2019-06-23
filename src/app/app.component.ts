import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ClientstorageService} from './shared/services/clientstorage/clientstorage.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from './user/ngrx/user.selectors';
import {AutoLoginUserAction} from './user/ngrx/user.actions';
import {User} from './user/domain/user';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
        const persistedToken = this.clientstorageService.getPersistedToken();
        if (persistedToken) {
            this.appStore.dispatch(new AutoLoginUserAction(persistedToken));
        }
    }
}
