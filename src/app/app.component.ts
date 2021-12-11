import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ClientstorageHelper} from './system/domain-service/clientstorage/clientstorage-helper';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from './user-state/ngrx/user.selectors';
import {AutoLoginUserAction} from './user-state/ngrx/user.actions';
import {User} from './user/domain-model/user';


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
        private clientstorageService: ClientstorageHelper
    ) {
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
