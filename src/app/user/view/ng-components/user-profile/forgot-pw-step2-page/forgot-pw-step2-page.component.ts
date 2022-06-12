import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ResetPwAction} from '../../../../state/ngrx/user.actions';


@Component({
    selector: 'app-forgot-pw-step2-page',
    templateUrl: './forgot-pw-step2-page.component.html',
    styleUrls: ['./forgot-pw-step2-page.component.css']
})
export class ForgotPwStep2PageComponent implements OnInit {
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


    public onResetPwClick([token, password, rememberMe]: [string, string, boolean]) {
        this.appStore.dispatch(new ResetPwAction(token, password, rememberMe));
    }
}
