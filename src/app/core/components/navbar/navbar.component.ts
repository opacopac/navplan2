import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from '../../../user/user.selectors';
import {User} from '../../../user/model/user';
import {SearchShowAction} from '../../../search/search.actions';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public readonly currentUser$: Observable<User>;


    constructor(
        private appStore: Store<any>) {

        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    public onShowSearchClicked() {
        this.appStore.dispatch(
            new SearchShowAction()
        );
    }
}
