import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getCurrentUser} from '../../../../state/ngrx/user.selectors';
import {ChangePwAction} from '../../../../state/ngrx/user.actions';
import {User} from '../../../../domain/model/user';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
    public currentUser$: Observable<User>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
    }


    public onChangePwClick([user, oldPw, newPw]: [User, string, string]) {
        this.appStore.dispatch(new ChangePwAction(user.token, oldPw, newPw));
    }
}
