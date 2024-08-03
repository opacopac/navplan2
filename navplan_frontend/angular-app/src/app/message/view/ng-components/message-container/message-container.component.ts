import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {getCurrentMessage} from '../../../state/ngrx/message.selectors';
import {Message} from '../../../domain/model/message';
import {MessageType} from '../../../domain/model/message-type';


const AUTO_DISMISS_TIME_MS = 4000;

@Component({
    selector: 'app-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit, OnDestroy {
    public readonly currentMessage$ = this.appStore.pipe(select(getCurrentMessage));
    private readonly currentMessageSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        public snackBar: MatSnackBar
    ) {
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
                message.messageText,
                undefined,
                {duration: AUTO_DISMISS_TIME_MS, panelClass: 'success-snack-bar'}
            );
        } else {
            this.snackBar.open(
                message.messageText,
                'Close',
                {panelClass: 'error-snack-bar'}
            );
        }
    }
}
