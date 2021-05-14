import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../user/domain-model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '../../../user/ngrx/user.selectors';
import {SearchActions2} from '../../../search/ngrx/search.actions';
import {LogoutUserAction} from '../../../user/ngrx/user.actions';


@Component({
    selector: 'app-navbar-container',
    templateUrl: './navbar-container.component.html',
    styleUrls: ['./navbar-container.component.css']
})
export class NavbarContainerComponent implements OnInit {
    public readonly currentUser$: Observable<User>;


    constructor(
        private appStore: Store<any>) {

        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
    }


    public onShowSearchClick() {
        this.appStore.dispatch(SearchActions2.showSearchField());
    }


    public onLogoffClick() {
        this.appStore.dispatch(new LogoutUserAction());
    }
}
