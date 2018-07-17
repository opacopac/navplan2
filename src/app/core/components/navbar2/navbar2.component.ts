import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../user/user.selectors';
import {User} from '../../../user/model/user';


@Component({
    selector: 'app-navbar2',
    templateUrl: './navbar2.component.html',
    styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component {
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
}
