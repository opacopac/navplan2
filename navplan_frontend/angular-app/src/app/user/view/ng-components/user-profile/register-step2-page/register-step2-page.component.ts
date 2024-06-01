import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RegisterUserAction} from '../../../../state/ngrx/user.actions';


@Component({
    selector: 'app-register-step2-page',
    templateUrl: './register-step2-page.component.html',
    styleUrls: ['./register-step2-page.component.scss']
})
export class RegisterStep2PageComponent implements OnInit {
    public token$: Observable<string>;


    constructor(
        private appStore: Store<any>,
        private route: ActivatedRoute) {

        this.token$ = route.params.pipe(
            map(params => params['token'])
        );
    }


    ngOnInit() {
    }


    public onCreateAccount([token, password, rememberMe]: [string, string, boolean]) {
        this.appStore.dispatch(new RegisterUserAction(token, password, rememberMe));
    }
}
