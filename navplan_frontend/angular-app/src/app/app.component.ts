import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ClientstorageHelper} from './system/domain/service/clientstorage/clientstorage-helper';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from './user/state/ngrx/user.selectors';
import {User} from './user/domain/model/user';
import {AutoLoginActions} from './user/state/ngrx/auto-login.actions';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(
        private appStore: Store<any>,
        private clientstorageService: ClientstorageHelper
    ) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
        // auto login "remembered" user
        const persistedToken = this.clientstorageService.getPersistedToken();
        if (persistedToken) {
            this.appStore.dispatch(AutoLoginActions.userAutoLogin());
        }
    }
}
