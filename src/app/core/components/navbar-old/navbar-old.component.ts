import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../user/user.selectors';
import {Observable} from 'rxjs';
import {User} from '../../../user/model/user';


@Component({
    selector: 'app-navbar-old',
    templateUrl: './navbar-old.component.html',
    styleUrls: ['./navbar-old.component.css']
})
export class NavbarOldComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.select(getCurrentUser);
    }


    ngOnInit() {
    }
}
