import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessageType} from '../domain-model/message-type';
import {ShowMessageAction} from '../ngrx/message.actions';
import {Message} from '../domain-model/message';


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private appStore: Store<any>) { }


    public showSuccessMessage(message: string): void {
        this.showMessage(MessageType.SUCCESS, message);
    }


    public showErrorMessage(message: string, error?: Error): void {
        if (error) {
            message += ' ' + error.message;
        }

        this.showMessage(MessageType.ERROR, message);
    }


    private showMessage(type: MessageType, message: string): void {
        this.appStore.dispatch(new ShowMessageAction(new Message(type, message)));
    }
}
