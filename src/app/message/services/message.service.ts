import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessageType} from '../domain/message-type';
import {ShowMessageAction} from '../message.actions';


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private appStore: Store<any>) { }


    public writeSuccessMessage(message: string) {
        this.writeMessage(MessageType.SUCCESS, message);
    }


    public writeErrorMessage(error: Error) {
        console.error(error);
        this.writeMessage(MessageType.ERROR, error.message);
    }


    private writeMessage(type: MessageType, message: string) {
        this.appStore.dispatch(new ShowMessageAction(type, message));
    }
}
