import {Component, OnInit} from '@angular/core';
import {SendLostPwEmailAction} from '../../../../state/ngrx/user.actions';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getLostPwEmailSentTo} from '../../../../state/ngrx/user.selectors';

@Component({
    selector: 'app-forgot-pw-step1-page',
    templateUrl: './forgot-pw-step1-page.component.html',
    styleUrls: ['./forgot-pw-step1-page.component.scss']
})
export class ForgotPwStep1PageComponent implements OnInit {
    public lostPwEmailSentTo$: Observable<string>;


    constructor(private appStore: Store<any>) {
        this.lostPwEmailSentTo$ = this.appStore.pipe(select(getLostPwEmailSentTo));
    }

    ngOnInit() {
    }

    public onSendLostPwEmailClick(email: string) {
        this.appStore.dispatch(new SendLostPwEmailAction(email));
    }
}
