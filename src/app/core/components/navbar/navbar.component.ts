import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../user/user.selectors';
import {User} from '../../../user/model/user';
import {SearchShowAction} from '../../../search/search.actions';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public currentUser$: Observable<User>;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );


    constructor(
        private appStore: Store<any>,
        private breakpointObserver: BreakpointObserver) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
    }


    public onShowSearchClicked() {
        this.appStore.dispatch(
            new SearchShowAction()
        );
    }
}
