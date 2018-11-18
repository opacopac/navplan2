import {Injectable} from '@angular/core';
import {MessageType} from '../../model/message-type';
import {Store} from '@ngrx/store';
import {HideMessageAction, ShowMessageAction} from '../../message.actions';


const AUTO_HIDE_TIME_MS = 4000;

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private appStore: Store<any>) { }


    public writeSuccessMessage(message: string, autoClear: boolean = true) {
        this.writeMessage(MessageType.SUCCESS, message, autoClear);
    }


    public writeErrorMessage(message: string, autoClear: boolean = false) {
        this.writeMessage(MessageType.ERROR, message, autoClear);
    }


    public writeMessage(type: MessageType, message: string, autoClear: boolean) {
        this.appStore.dispatch(new ShowMessageAction(type, message));

        /*if (autoClear) {
            setTimeout(this.clearMessage.bind(this), AUTO_HIDE_TIME_MS);
        }*/
    }


    public clearMessage() {
        this.appStore.dispatch(new HideMessageAction());
    }
}
