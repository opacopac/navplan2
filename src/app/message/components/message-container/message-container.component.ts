import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {getCurrentMessage} from '../../message.selectors';
import {Message} from '../../model/message';
import {MessageType} from '../../model/message-type';


const AUTO_DISMISS_TIME_MS = 4000;

@Component({
    selector: 'app-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit, OnDestroy {
    public readonly currentMessage$ = this.appStore.pipe(select(getCurrentMessage));
    private readonly currentMessageSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        public snackBar: MatSnackBar) {

        this.currentMessageSubscription = this.currentMessage$.subscribe((msg) => {
            if (msg) {
                this.showSnackBar(msg);
            }
        });
    }


    ngOnInit() {
    }


    ngOnDestroy() {
        this.currentMessageSubscription.unsubscribe();
    }


    private showSnackBar(message: Message) {
        if (message.type === MessageType.SUCCESS) {
            this.snackBar.open(
                message.message,
                undefined,
                { duration: AUTO_DISMISS_TIME_MS, panelClass: 'success-snack-bar' });
        } else {
            this.snackBar.open(
                message.message,
                'Close',
                { panelClass: 'error-snack-bar' });
        }
    }
}
