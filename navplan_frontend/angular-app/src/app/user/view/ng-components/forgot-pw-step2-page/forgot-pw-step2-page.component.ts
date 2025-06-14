import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {LostPwActions} from '../../../state/ngrx/lost-pw.actions';
import {ForgotPwStep2FormComponent} from '../forgot-pw-step2-form/forgot-pw-step2-form.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-forgot-pw-step2-page',
    imports: [
        CommonModule,
        ForgotPwStep2FormComponent
    ],
    templateUrl: './forgot-pw-step2-page.component.html',
    styleUrls: ['./forgot-pw-step2-page.component.scss']
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


    public onResetPwClick([password, rememberMe]: [string, boolean]) {
        this.appStore.dispatch(LostPwActions.userResetPw({
            newPassword: password,
            rememberMe: rememberMe
        }));
    }
}
